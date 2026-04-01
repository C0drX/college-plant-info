const express = require("express");
const router = express.Router();

const plantController = require("../controllers/plantController");
const upload = require("../middleware/upload");

router.post(
  "/",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "college", maxCount: 1 },
    { name: "reference", maxCount: 1 },
  ]),
  plantController.addPlant,
);

router.get("/", plantController.getAllPlants);
router.get("/:id", plantController.getPlantById);

router.put(
  "/:id",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "college", maxCount: 1 },
    { name: "reference", maxCount: 1 },
  ]),
  plantController.updatePlant,
);

router.delete("/:id", plantController.deletePlant);

router.put("/:id/restore", plantController.restorePlant);

module.exports = router;
