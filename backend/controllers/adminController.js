const bcrypt = require("bcrypt");
const { getPool } = require("../config/db");

const {
  generateAdminId,
  generateRecoveryKey,
} = require("../utils/idGenerator");
const { generateToken } = require("../utils/jwt");

const {
  createInvite,
  validateInvite,
  markInviteUsed,
} = require("../services/inviteService");

// const pool = getPool();

/**
 * ---------------------------------------------------
 * Get admins List
 * ---------------------------------------------------
 */
async function getAdmins(req, res) {
  const pool = getPool();
  try {
    const query = `
        SELECT
        a.id,
        a.name,
        a.email,
        a.invited_by,
        a.last_login,
        a.created_at,
        a.is_active 
        FROM admins a`;
    const [result] = await pool.query(query);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

/**
 * ---------------------------------------------------
 * Admin Login
 * ---------------------------------------------------
 * Authenticates admin and returns JWT token
 */
async function adminLogin(req, res) {
  const pool = getPool();
  try {
    const { email, password } = req.body;

    /**
     * ---------------------------------------------------
     * Find Admin By Email
     * ---------------------------------------------------
     */
    const query = `
            SELECT *
            FROM admins
            WHERE email = ?
            AND is_active = TRUE
        `;

    const [rows] = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const admin = rows[0];

    /**
     * ---------------------------------------------------
     * Verify Password
     * ---------------------------------------------------
     */
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    /**
     * ---------------------------------------------------
     * Generate JWT Token
     * ---------------------------------------------------
     */
    const token = generateToken(admin.id);

    /**
     * ---------------------------------------------------
     * Update Last Login
     * ---------------------------------------------------
     */
    await pool.query("UPDATE admins SET last_login = NOW() WHERE id = ?", [
      admin.id,
    ]);

    /**
     * ---------------------------------------------------
     * Send Response
     * ---------------------------------------------------
     */
    return res.json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Login failed",
    });
  }
}

/**
 * ---------------------------------------------------
 * Generate Invite Key
 * ---------------------------------------------------
 * Only authenticated admins can generate invites
 */
async function generateInvite(req, res) {
  const pool = getPool();
  try {
    const adminId = req.admin.id;

    /**
     * ---------------------------------------------------
     * Create Invite Using Service
     * ---------------------------------------------------
     */
    const invite = await createInvite(adminId);

    return res.json({
      message: "Invite key generated",
      invite,
    });
  } catch (error) {
    console.error("Invite generation error:", error);

    return res.status(500).json({
      message: "Failed to generate invite",
    });
  }
}

/**
 * ---------------------------------------------------
 * Register New Admin
 * ---------------------------------------------------
 * Uses invite key for registration
 */
async function registerAdmin(req, res) {
  const pool = getPool();
  try {
    const { invite_key, name, email, password } = req.body;

    /**
     * ---------------------------------------------------
     * Validate Invite Key
     * ---------------------------------------------------
     */
    const invite = await validateInvite(invite_key);

    if (!invite) {
      return res.status(400).json({
        message: "Invalid or expired invite key",
      });
    }

    /**
     * ---------------------------------------------------
     * Check If Email Already Exists
     * ---------------------------------------------------
     */
    const [existing] = await pool.query(
      "SELECT id FROM admins WHERE email = ?",
      [email],
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    /**
     * ---------------------------------------------------
     * Generate Admin ID
     * ---------------------------------------------------
     */
    const adminId = generateAdminId();

    /**
     * ---------------------------------------------------
     * Generate Recovery Key
     * ---------------------------------------------------
     */
    const recoveryKey = generateRecoveryKey();

    /**
     * ---------------------------------------------------
     * Hash Password
     * ---------------------------------------------------
     */
    const passwordHash = await bcrypt.hash(password, 10);

    /**
     * ---------------------------------------------------
     * Hash Recovery Key
     * ---------------------------------------------------
     */
    const recoveryKeyHash = await bcrypt.hash(recoveryKey, 10);

    /**
     * ---------------------------------------------------
     * Insert Admin Into Database
     * ---------------------------------------------------
     */
    const query = `
            INSERT INTO admins
            (id, name, email, password_hash, recovery_key_hash, invited_by)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

    await pool.query(query, [
      adminId,
      name,
      email,
      passwordHash,
      recoveryKeyHash,
      invite.created_by,
    ]);

    /**
     * ---------------------------------------------------
     * Mark Invite As Used
     * ---------------------------------------------------
     */
    await markInviteUsed(invite.id, adminId);

    /**
     * ---------------------------------------------------
     * Send Recovery Key (Shown Only Once)
     * ---------------------------------------------------
     */
    return res.json({
      message: "Admin registered successfully",
      recovery_key: recoveryKey,
    });
  } catch (error) {
    console.error("Admin registration error:", error);

    return res.status(500).json({
      message: "Registration failed",
    });
  }
}

async function updateProfile(req, res) {
  const pool = getPool();

  try {
    /**
     * ---------------------------------------------------
     * Extract Admin ID (from JWT middleware)
     * ---------------------------------------------------
     */
    const adminId = req.admin?.id;

    if (!adminId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    /**
     * ---------------------------------------------------
     * Extract Body Data
     * ---------------------------------------------------
     */
    const { name, password } = req.body;

    /**
     * ---------------------------------------------------
     * Validate Input
     * ---------------------------------------------------
     */
    if (!name && !password) {
      return res.status(400).json({
        message: "Nothing to update",
      });
    }

    let fields = [];
    let values = [];

    /**
     * ---------------------------------------------------
     * Update Name (if provided)
     * ---------------------------------------------------
     */
    if (name && name.trim() !== "") {
      fields.push("name = ?");
      values.push(name.trim());
    }

    /**
     * ---------------------------------------------------
     * Update Password (if provided)
     * ---------------------------------------------------
     */
    if (password && password.trim() !== "") {
      const passwordHash = await bcrypt.hash(password, 10);

      fields.push("password_hash = ?");
      values.push(passwordHash);
    }

    /**
     * ---------------------------------------------------
     * If nothing valid to update
     * ---------------------------------------------------
     */
    if (fields.length === 0) {
      return res.status(400).json({
        message: "No valid fields to update",
      });
    }

    /**
     * ---------------------------------------------------
     * Execute Update Query
     * ---------------------------------------------------
     */
    const query = `
      UPDATE admins
      SET ${fields.join(", ")}
      WHERE id = ?
    `;

    values.push(adminId);

    await pool.query(query, values);

    /**
     * ---------------------------------------------------
     * Send Response
     * ---------------------------------------------------
     */
    return res.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      message: "Failed to update profile",
    });
  }
}

async function resetAdminPassword(req, res) {
  const pool = getPool();

  try {
    /**
     * ---------------------------------------------------
     * Extract Request Data
     * ---------------------------------------------------
     */
    const { email, recovery_key, new_password } = req.body;

    /**
     * ---------------------------------------------------
     * Basic Validation
     * ---------------------------------------------------
     */
    if (!email || !recovery_key || !new_password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    /**
     * ---------------------------------------------------
     * Fetch Admin By Email
     * ---------------------------------------------------
     */
    const [admins] = await pool.query(
      "SELECT id, recovery_key_hash, password_hash FROM admins WHERE email = ? AND is_active = 1",
      [email],
    );

    if (admins.length === 0) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const admin = admins[0];

    /**
     * ---------------------------------------------------
     * Compare Recovery Key (bcrypt compare)
     * ---------------------------------------------------
     */
    const isValidKey = await bcrypt.compare(
      recovery_key,
      admin.recovery_key_hash,
    );

    if (!isValidKey) {
      return res.status(400).json({
        message: "Invalid recovery key",
      });
    }

    const isPasswordSame = await bcrypt.compare(
      new_password,
      admin.password_hash,
    );

    if (isPasswordSame) {
      return res.status(400).json({
        message: "New password cannot be the same as the current password !",
      });
    }

    /**
     * ---------------------------------------------------
     * Hash New Password
     * ---------------------------------------------------
     */
    const passwordHash = await bcrypt.hash(new_password, 10);

    /**
     * ---------------------------------------------------
     * Update Password In Database
     * ---------------------------------------------------
     */
    await pool.query("UPDATE admins SET password_hash = ? WHERE id = ?", [
      passwordHash,
      admin.id,
    ]);

    /**
     * ---------------------------------------------------
     * Send Success Response
     * ---------------------------------------------------
     */
    return res.json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      message: "Failed to reset password",
    });
  }
}

module.exports = {
  adminLogin,
  generateInvite,
  registerAdmin,
  updateProfile,
  getAdmins,
  resetAdminPassword,
};
