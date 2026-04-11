const { exec } = require("child_process");
const path = require("path");

const generatePlantQR = (plantId) => {
  return new Promise((resolve, reject) => {
    const plantURL = `${process.env.FRONTEND_ADDRESS}/plant/${plantId}`;
    const fileName = `plant-${plantId}.png`;
    const qrPath = path.join(__dirname, "..", "qrcodes", fileName);

    const command = `python3 services/generate_qr.py "${plantURL}" "${qrPath}" "./assets/leaf.png"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Python error:", error);
        return reject(error);
      }

      if (stderr) console.log("⚠️ stderr:", stderr);

      resolve(fileName);
    });
  });
};

module.exports = generatePlantQR;
