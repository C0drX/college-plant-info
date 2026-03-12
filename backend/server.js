require("dotenv").config();

const express = require("express");
const cors = require("cors");

const plantRoutes = require("./routes/plants");

const app = express();

app.use(cors());
app.use(express.json());

//* For uploading images
app.use("/images", express.static("images"));
app.use("/qrcodes", express.static("qrcodes"));

//* for defining routes
app.use("/api/plants", plantRoutes);

//!! For Serving Frontend
// app.use("/plants", express.static("../frontend/dist"));
// app.get("/plants/*", (req, res) => {
//   res.sendFile(path.resolve("../frontend/dist/index.html"));
// });

//!----------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
