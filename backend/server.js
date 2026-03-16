require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectWithRetry } = require("./config/db");
const plantRoutes = require("./routes/plants");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/images", express.static("images"));
app.use("/qrcodes", express.static("qrcodes"));

app.use("/api/plants", plantRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectWithRetry(); // wait until DB ready

  app.listen(PORT, () => {
    console.log(`🚀 Server is up and running on port ${PORT}`);
  });
}

startServer();
