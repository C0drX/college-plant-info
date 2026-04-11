const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },

  // filename: function (req, file, cb) {
  //   console.log("PARAMS:", req.params);
  //   console.log("BODY:", req.body);
  //   const plantId = req.params.plant_id || "temp";
  //   const type = file.fieldname;

  //   const ext = path.extname(file.originalname);

  //   cb(null, `plant-${plantId}-${type}${ext}`);
  // },

  filename: function (req, file, cb) {
    const type = file.fieldname;
    const ext = path.extname(file.originalname);

    cb(null, `temp-${type}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
