const { verifyToken } = require("../utils/jwt");

/**
 * ---------------------------------------------------
 * Admin Authentication Middleware
 * ---------------------------------------------------
 * This middleware protects admin routes.
 * It verifies JWT token and attaches admin info
 * to the request object.
 */
function verifyAdmin(req, res, next) {
  try {
    /**
     * ---------------------------------------------------
     * Read Authorization Header
     * ---------------------------------------------------
     * Expected format:
     * Authorization: Bearer TOKEN
     */
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    /**
     * ---------------------------------------------------
     * Extract Token
     * ---------------------------------------------------
     */
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing",
      });
    }

    /**
     * ---------------------------------------------------
     * Verify JWT Token
     * ---------------------------------------------------
     */
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    /**
     * ---------------------------------------------------
     * Attach Admin Info To Request
     * ---------------------------------------------------
     * Controllers can access:
     * req.admin.id
     */
    req.admin = {
      id: decoded.adminId,
    };

    /**
     * Continue To Next Middleware / Controller
     */
    next();
  } catch (error) {
    console.error("Admin auth error:", error);

    return res.status(500).json({
      message: "Authentication failed",
    });
  }
}

module.exports = verifyAdmin;
