const express = require("express");
const router = express.Router();

/**
 * ---------------------------------------------------
 * Import Controllers
 * ---------------------------------------------------
 */
const {
  adminLogin,
  generateInvite,
  registerAdmin,
  getAdmins,
} = require("../controllers/adminController");

/**
 * ---------------------------------------------------
 * Import Middleware
 * ---------------------------------------------------
 */
const verifyAdmin = require("../middleware/verifyAdmin");

/**
 * ---------------------------------------------------
 * Admin Login
 * ---------------------------------------------------
 * Public route
 */
router.post("/login", adminLogin);

/**
 * ---------------------------------------------------
 * Generate Invite Key
 * ---------------------------------------------------
 * Protected route (admin required)
 */
router.post("/generate-invite", verifyAdmin, generateInvite);

/**
 * ---------------------------------------------------
 * Register New Admin
 * ---------------------------------------------------
 * Uses invite key
 */
router.post("/register", registerAdmin);

/**
 * ---------------------------------------------------
 * Get Existing Admins List
 * ---------------------------------------------------
 * Protected route (admin required)
 */
router.get("/get-admins", getAdmins);

module.exports = router;
