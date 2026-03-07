const QRCode = require("qrcode");
const path = require("path");

const generatePlantQR = async (plantId) => {

//   const plantURL = `http://192.168.1.4:5173/plant/${plantId}`;
  const plantURL = `http://192.168.1.4:5000/api/plants/${plantId}`;

  const qrPath = path.join(
    __dirname,
    "..",
    "qrcodes",
    `plant-${plantId}.png`
  );

  await QRCode.toFile(qrPath, plantURL, {
    color: {
      dark: "#1b5e20",   // dark green
      light: "#ffffff"
    },
    width: 500,
    margin: 2
  });

  return `plant-${plantId}.png`;
};

module.exports = generatePlantQR;