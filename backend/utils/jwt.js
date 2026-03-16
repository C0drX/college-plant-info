const jwt = require("jsonwebtoken");

/**
 * SECRET KEY
 * This should be stored in environment variables
 * Example in .env file:
 * JWT_SECRET=super_secret_key
 */
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * ---------------------------------------------------
 * Generate JWT Token
 * ---------------------------------------------------
 * Used when admin logs in successfully
 * Payload will contain admin id
 */
function generateToken(adminId) {
  const token = jwt.sign(
    { adminId: adminId }, // payload
    JWT_SECRET, // secret key
    { expiresIn: "7d" }, // token validity
  );

  return token;
}

/**
 * ---------------------------------------------------
 * Verify JWT Token
 * ---------------------------------------------------
 * Used in authentication middleware
 * Returns decoded payload if valid
 */
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
