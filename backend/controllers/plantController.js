// const db = require("../config/db");
const fs = require("fs");
const path = require("path");
const generatePlantQR = require("../services/qrService");
const { getPool } = require("../config/db");

const cache = {};

// Get all plants
exports.getAllPlants = async (req, res) => {
  const pool = getPool();

  const sql = `
      SELECT 
        p.id,
        p.common_name,
        p.scientific_name,
        p.origin,
        p.family,
        p.location,
        p.category,
        p.fruit_info,
        p.is_active,
        p.medicinal_importance,
        MIN(pi.image_path) AS cover_image
      FROM plants p
      LEFT JOIN plant_images pi 
        ON p.id = pi.plant_id
      GROUP BY p.id
      ORDER BY p.id DESC
    `;

  const [results] = await pool.query(sql);

  // cover_image ko full path bana dete hain
  const plants = results.map((p) => ({
    ...p,
    cover_image: p.cover_image ? `/images/${p.cover_image}` : null,
  }));

  res.json(plants);
};

// Get plant by ID
exports.getPlantById = async (req, res) => {
  try {
    const pool = getPool();
    const id = req.params.id;

    // cache check
    if (cache[id]) {
      return res.json(cache[id]);
    }

    const [plantResult] = await pool.query(
      "SELECT * FROM plants WHERE id = ?",
      [id],
    );

    if (plantResult.length === 0) {
      return res.status(404).json({ message: "Plant not found" });
    }

    const plant = plantResult[0];

    if (plant.is_active === 0) {
      return res.status(404).json({ message: "Plant not found" });
    }

    const [images] = await pool.query(
      "SELECT image_path FROM plant_images WHERE plant_id = ?",
      [id],
    );

    plant.images = images.map((img) => `/images/${img.image_path}`);

    // cache save
    cache[id] = plant;

    res.json(plant);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add plant
exports.addPlant = async (req, res) => {
  pool = getPool();
  try {
    const {
      common_name,
      scientific_name,
      family,
      description,
      uses,
      location,
      origin,
      category,
      fruit_info,
      medicinal_importance,
    } = req.body;

    const sql = `
      INSERT INTO plants
      (common_name, scientific_name, family, description, uses, location, origin, category, fruit_info, medicinal_importance, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)
    `;

    const [result] = await pool.query(sql, [
      common_name,
      scientific_name,
      family,
      description,
      uses,
      location,
      origin,
      category,
      fruit_info,
      medicinal_importance,
    ]);

    const plantId = result.insertId;

    const imageValues = [];

    const processImage = (file, type) => {
      const ext = path.extname(file.originalname);
      const newName = `plant-${plantId}-${type}${ext}`;

      const oldPath = path.join(__dirname, "..", "images", file.filename);
      const newPath = path.join(__dirname, "..", "images", newName);

      fs.renameSync(oldPath, newPath);

      imageValues.push([plantId, newName, type]);
    };

    if (req.files?.cover) {
      processImage(req.files.cover[0], "cover");
    }

    if (req.files?.college) {
      processImage(req.files.college[0], "college");
    }

    if (req.files?.reference) {
      processImage(req.files.reference[0], "reference");
    }

    if (imageValues.length > 0) {
      const imageQuery = `
        INSERT INTO plant_images (plant_id, image_path, image_type)
        VALUES ?
      `;

      await pool.query(imageQuery, [imageValues], (err) => {
        if (err) console.log("Image insert error:", err);
      });
    }

    const qrFile = await generatePlantQR(plantId);

    res.json({
      message: "Plant added successfully",
      plantId: plantId,
      qr: `/qrcodes/plant-${plantId}.png`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
// Update plant
exports.updatePlant = async (req, res) => {
  try {
    const pool = getPool();
    const id = parseInt(req.params.id);

    const [result] = await pool.query("SELECT * FROM plants WHERE id = ?", [
      id,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Plant not found" });
    }

    const plant = result[0];

    const updatedData = {
      common_name: req.body.common_name ?? plant.common_name,
      scientific_name: req.body.scientific_name ?? plant.scientific_name,
      family: req.body.family ?? plant.family,
      description: req.body.description ?? plant.description,
      uses: req.body.uses ?? plant.uses,
      location: req.body.location ?? plant.location,
      origin: req.body.origin ?? plant.origin,
      category: req.body.category ?? plant.category,
      fruit_info: req.body.fruit_info ?? plant.fruit_info,
      medicinal_importance:
        req.body.medicinal_importance ?? plant.medicinal_importance,
    };

    await pool.query(
      `UPDATE plants
       SET common_name=?, scientific_name=?, family=?, description=?, uses=?, location=?, origin=?, category=?, fruit_info=?, medicinal_importance=?
       WHERE id=?`,
      [
        updatedData.common_name,
        updatedData.scientific_name,
        updatedData.family,
        updatedData.description,
        updatedData.uses,
        updatedData.location,
        updatedData.origin,
        updatedData.category,
        updatedData.fruit_info,
        updatedData.medicinal_importance,
        id,
      ],
    );

    const processImage = async (file, type) => {
      const ext = path.extname(file.originalname);
      const newName = `plant-${id}-${type}${ext}`;

      const oldPath = path.join(__dirname, "..", "images", file.filename);
      const newPath = path.join(__dirname, "..", "images", newName);

      await fs.rename(oldPath, newPath);

      await pool.query(
        `UPDATE plant_images SET image_path=? WHERE plant_id=? AND image_type=?`,
        [newName, id, type],
      );
    };

    if (req.files?.cover) await processImage(req.files.cover[0], "cover");
    if (req.files?.college) await processImage(req.files.college[0], "college");
    if (req.files?.reference)
      await processImage(req.files.reference[0], "reference");

    res.json({
      message: "Plant updated successfully",
      updatedData,
    });
    delete cache[id];
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete plant //! Hard DELETE
// exports.deletePlant = async (req, res) => {
//   try {
//     const pool = getPool();
//     const plantId = req.params.id;

//     const [images] = await pool.query(
//       "SELECT image_path FROM plant_images WHERE plant_id = ?",
//       [plantId],
//     );

//     for (const img of images) {
//       const imagePath = path.join(__dirname, "..", "images", img.image_path);

//       try {
//         await fs.unlink(imagePath);
//       } catch (err) {
//         console.log("Image delete error:", err.message);
//       }
//     }

//     const qrPath = path.join(
//       __dirname,
//       "..",
//       "qrcodes",
//       `plant-${plantId}.png`,
//     );

//     try {
//       await fs.unlink(qrPath);
//     } catch (err) {
//       console.log("QR delete error:", err.message);
//     }

//     await pool.query("DELETE FROM plants WHERE id = ?", [plantId]);

//     res.json({
//       message: "Plant and all related files deleted successfully",
//     });
//     delete cache[id];
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

//Delete plant //! Soft DELETE
exports.deletePlant = async (req, res) => {
  try {
    const pool = getPool();
    const plantId = req.params.id;

    // Check if plant exists
    const [plant] = await pool.query(
      "SELECT id, is_active FROM plants WHERE id = ?",
      [plantId],
    );

    if (plant.length === 0) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Already inactive check (optional but good practice)
    if (!plant[0].is_active) {
      return res.status(400).json({ message: "Plant already deleted" });
    }

    // Soft delete (mark inactive)
    await pool.query("UPDATE plants SET is_active = false WHERE id = ?", [
      plantId,
    ]);

    // Optional: clear cache
    delete cache[plantId];

    res.json({
      message: "Plant deleted (soft delete) successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//restore plant
exports.restorePlant = async (req, res) => {
  try {
    const pool = getPool();
    const plantId = req.params.id;
    const [plant] = await pool.query(
      "SELECT id, is_active FROM plants WHERE id = ?",
      [plantId],
    );

    if (plant.length === 0) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Already inactive check (optional but good practice)
    if (plant[0].is_active) {
      return res.status(400).json({ message: "Plant already active" });
    }

    // Soft delete (mark inactive)
    await pool.query("UPDATE plants SET is_active = true WHERE id = ?", [
      plantId,
    ]);

    // Optional: clear cache
    delete cache[plantId];

    res.json({
      message: "Plant restored successfully",
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Regenerate all QR codes
exports.regenerateAllQR = async (req, res) => {
  try {
    const pool = getPool();

    const [plants] = await pool.query("SELECT id FROM plants");

    for (const plant of plants) {
      await generatePlantQR(plant.id);
    }

    res.json({
      message: "All QR codes regenerated successfully",
      total: plants.length,
    });
  } catch (error) {
    res.status(500).json({
      error: "QR regeneration failed",
      details: error,
    });
  }
};
