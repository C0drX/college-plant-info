const db = require("../config/db");
const fs = require("fs");
const path = require("path");
const generatePlantQR = require("../services/qrService");

// Get all plants
exports.getAllPlants = (req, res) => {
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
      p.medicinal_importance,
      MIN(pi.image_path) AS cover_image
    FROM plants p
    LEFT JOIN plant_images pi 
      ON p.id = pi.plant_id
    GROUP BY p.id
    ORDER BY p.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    // cover_image ko full path bana dete hain
    const plants = results.map((p) => ({
      ...p,
      cover_image: p.cover_image ? `/images/${p.cover_image}` : null,
    }));

    res.json(plants);
  });
};

// Get plant by ID
exports.getPlantById = (req, res) => {
  const id = req.params.id;

  const plantQuery = "SELECT * FROM plants WHERE id = ?";

  db.query(plantQuery, [id], (err, plantResult) => {
    if (err) return res.status(500).json(err);

    if (plantResult.length === 0) {
      return res.status(404).json({ message: "Plant not found" });
    }

    const plant = plantResult[0];

    const imageQuery = "SELECT image_path FROM plant_images WHERE plant_id = ?";

    db.query(imageQuery, [id], (err, images) => {
      if (err) return res.status(500).json(err);

      plant.images = images.map((img) => `/images/${img.image_path}`);

      res.json(plant);
    });
  });
};

// Add plant
exports.addPlant = (req, res) => {
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
  (common_name, scientific_name, family, description, uses, location, origin, category, fruit_info, medicinal_importance)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
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
    ],
    async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

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

        db.query(imageQuery, [imageValues], (err) => {
          if (err) console.log("Image insert error:", err);
        });
      }

      try {
        const qrFile = await generatePlantQR(plantId);

        res.json({
          message: "Plant added successfully",
          plantId: plantId,
          qr: `/qrcodes/plant-${plantId}.png`,
        });
      } catch (qrError) {
        res.status(500).json({
          error: "QR generation failed",
          details: qrError,
        });
      }
    },
  );
};

// Update plant
exports.updatePlant = (req, res) => {
  const id = parseInt(req.params.id);

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

  const getPlantQuery = "SELECT * FROM plants WHERE id = ?";

  db.query(getPlantQuery, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Plant not found" });
    }

    const plant = result[0];

    const updatedData = {
      common_name: common_name ?? plant.common_name,
      scientific_name: scientific_name ?? plant.scientific_name,
      family: family ?? plant.family,
      description: description ?? plant.description,
      uses: uses ?? plant.uses,
      location: location ?? plant.location,
      origin: origin ?? plant.origin,
      category: category ?? plant.category,
      fruit_info: fruit_info ?? plant.fruit_info,
      medicinal_importance: medicinal_importance ?? plant.medicinal_importance,
    };

    const updateQuery = `
      UPDATE plants
      SET common_name=?, scientific_name=?, family=?, description=?, uses=?, location=?, origin=?, category=?, fruit_info=?, medicinal_importance=?
      WHERE id=?
    `;

    db.query(
      updateQuery,
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
      (err) => {
        if (err) return res.status(500).json(err);

        // IMAGE UPDATE SECTION

        const processImage = (file, type) => {
          const ext = path.extname(file.originalname);
          const newName = `plant-${id}-${type}${ext}`;

          const oldPath = path.join(__dirname, "..", "images", file.filename);
          const newPath = path.join(__dirname, "..", "images", newName);

          fs.renameSync(oldPath, newPath);

          const imageQuery = `
            UPDATE plant_images
            SET image_path=?
            WHERE plant_id=? AND image_type=?
          `;

          db.query(imageQuery, [newName, id, type], (err) => {
            if (err) {
              console.log("Image update error:", err);
            }
          });
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

        res.json({
          message: "Plant updated successfully",
          updatedData,
        });
      },
    );
  });
};

// Delete plant
exports.deletePlant = (req, res) => {
  const plantId = req.params.id;

  // Step 1: plant images fetch karo
  const imageQuery = "SELECT image_path FROM plant_images WHERE plant_id = ?";

  db.query(imageQuery, [plantId], (err, images) => {
    if (err) {
      return res.status(500).json(err);
    }

    // Step 2: images delete karo
    images.forEach((img) => {
      const imagePath = path.join(__dirname, "..", "images", img.image_path);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log("Image delete error:", err.message);
        }
      });
    });

    // Step 3: QR delete
    const qrPath = path.join(
      __dirname,
      "..",
      "qrcodes",
      `plant-${plantId}.png`,
    );

    fs.unlink(qrPath, (err) => {
      if (err) {
        console.log("QR delete error:", err.message);
      }
    });

    // Step 4: DB se plant delete
    const deletePlantQuery = "DELETE FROM plants WHERE id = ?";

    db.query(deletePlantQuery, [plantId], (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Plant and all related files deleted successfully",
      });
    });
  });
};

///!!! Regenerate QR Codes with latest data
exports.regenerateAllQR = async (req, res) => {
  const sql = "SELECT id FROM plants";

  db.query(sql, async (err, plants) => {
    if (err) {
      return res.status(500).json(err);
    }

    try {
      for (const plant of plants) {
        const plantId = plant.id;

        await generatePlantQR(plantId);
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
  });
};
