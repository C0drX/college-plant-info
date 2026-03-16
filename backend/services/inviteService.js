const { getPool } = require("../config/db"); // your mysql pool/connection
const { generateInviteKey } = require("../utils/idGenerator");

/**
 * ---------------------------------------------------
 * Create Invite Key
 * ---------------------------------------------------
 * Generates a new invite key and stores it in database.
 * The invite will expire in 24 hours.
 */
async function createInvite(adminId) {
  const db = getPool();
  try {
    /**
     * ---------------------------------------------------
     * Generate Invite Key
     * ---------------------------------------------------
     */
    const inviteKey = generateInviteKey();

    /**
     * ---------------------------------------------------
     * Calculate Expiry Time (24 Hours)
     * ---------------------------------------------------
     */
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    /**
     * ---------------------------------------------------
     * Insert Invite Into Database
     * ---------------------------------------------------
     */
    const query = `
            INSERT INTO admin_invites
            (invite_key, created_by_admin_id, expires_at)
            VALUES (?, ?, ?)
        `;

    await db.query(query, [inviteKey, adminId, expiresAt]);

    /**
     * ---------------------------------------------------
     * Return Invite Key
     * ---------------------------------------------------
     */
    return {
      inviteKey,
      expiresAt,
    };
  } catch (error) {
    console.error("Error creating invite:", error);
    throw error;
  }
}

/**
 * ---------------------------------------------------
 * Validate Invite Key
 * ---------------------------------------------------
 * Used during admin registration
 */
async function validateInvite(inviteKey) {
  const db = getPool();
  try {
    const query = `
            SELECT *
            FROM admin_invites
            WHERE invite_key = ?
            AND used = FALSE
            AND is_active = TRUE
        `;

    const [rows] = await db.query(query, [inviteKey]);

    if (rows.length === 0) {
      return null;
    }

    const invite = rows[0];

    /**
     * ---------------------------------------------------
     * Check Expiry
     * ---------------------------------------------------
     */
    if (new Date(invite.expires_at) < new Date()) {
      return null;
    }

    return invite;
  } catch (error) {
    console.error("Invite validation error:", error);
    throw error;
  }
}

/**
 * ---------------------------------------------------
 * Mark Invite As Used
 * ---------------------------------------------------
 * Called after successful admin registration
 */
async function markInviteUsed(inviteId, newAdminId) {
  const db = getPool();
  try {
    const query = `
            UPDATE admin_invites
            SET used = TRUE,
                used_by_admin_id = ?
            WHERE id = ?
        `;

    await db.query(query, [newAdminId, inviteId]);
  } catch (error) {
    console.error("Error marking invite used:", error);
    throw error;
  }
}

module.exports = {
  createInvite,
  validateInvite,
  markInviteUsed,
};
