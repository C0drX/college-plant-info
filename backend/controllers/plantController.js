const db = require("../config/db");
const fs = require("fs");
const path = require("path");
const generatePlantQR = require("../services/qrService");

// Get all plants
exports.getAllPlants = (req, res) => {

  const sql = "SELECT * FROM plants";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });

};


// Get plant by ID
exports.getPlantById = (req, res) => {

  const id = req.params.id;

  const sql = "SELECT * FROM plants WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });

};


// Add plant
exports.addPlant = (req, res) => {

  const { common_name, scientific_name, family, description, uses, location } = req.body;

  const image = req.file ? req.file.filename : null;

  const sql = `
  INSERT INTO plants
  (common_name, scientific_name, family, description, uses, location, image)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [common_name, scientific_name, family, description, uses, location, image],
    async (err, result) => {

      if (err) {
        return res.status(500).json({
          error: "Database insert failed",
          details: err
        });
      }

      try {

        const plantId = result.insertId;

        // QR generate
        const qrFile = await generatePlantQR(plantId);

        res.json({
          message: "Plant added successfully",
          plantId: plantId,
          image: image ? `/images/${image}` : null,
          qr: `/qrcodes/${qrFile}`
        });

      } catch (qrError) {

        res.status(500).json({
          error: "Plant inserted but QR generation failed",
          details: qrError
        });

      }

    }
  );
};

// Update plant
exports.updatePlant = (req, res) => {
  const id = req.params.id;

  const { common_name, scientific_name, family, description, uses, location } = req.body;

  const newImage = req.file ? req.file.filename : null;

  const getPlantQuery = "SELECT * FROM plants WHERE id = ?";

  db.query(getPlantQuery, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Plant not found" });
    }

    const plant = result[0];

    // agar new image aayi hai to old image delete karo
    if (newImage && plant.image) {
      const oldImagePath = path.join(__dirname, "..", "images", plant.image);

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.log("Old image delete error:", err.message);
        }
      });
    }

    const updatedData = {
      common_name: common_name || plant.common_name,
      scientific_name: scientific_name || plant.scientific_name,
      family: family || plant.family,
      description: description || plant.description,
      uses: uses || plant.uses,
      location: location || plant.location,
      image: newImage || plant.image
    };

    const updateQuery = `
      UPDATE plants
      SET common_name=?, scientific_name=?, family=?, description=?, uses=?, location=?, image=?
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
        updatedData.image,
        id
      ],
      (err) => {
        if (err) return res.status(500).json(err);

        res.json({
          message: "Plant updated successfully",
          updatedData
        });
      }
    );
  });
};


// Delete plant
exports.deletePlant = (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM plants WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Plant deleted"
    });
  });

};