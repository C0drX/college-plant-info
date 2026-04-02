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
  updateProfile,
  resetAdminPassword,
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

/**
 * ---------------------------------------------------
 * Update Admin Profile
 * ---------------------------------------------------
 * Protected route (admin required)
 */
router.post("/update-profile", verifyAdmin, updateProfile);

/**
 * ---------------------------------------------------
 * Reset Admin Password
 * ---------------------------------------------------
 * Uses recovery key
 */
router.post("/reset-password", resetAdminPassword);

module.exports = router;
