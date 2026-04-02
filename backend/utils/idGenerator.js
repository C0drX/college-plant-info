const crypto = require("crypto");

/**
 * Generate random admin ID
 * Example: adm_f83a91c2d4b1
 */
function generateAdminId() {
  const randomPart = crypto.randomBytes(6).toString("hex");
  return `adm_${randomPart}`;
}

/**
 * Generate invite key
 * Example: 7fa91c3b2e
 */
function generateInviteKey() {
  return crypto.randomBytes(5).toString("hex").toUpperCase();
}

/**
 * Generate recovery key
 * Example: ABF2-9DK3-PQ81
 */
function generateRecoveryKey() {
  const segment = () => crypto.randomBytes(2).toString("hex").toUpperCase();

  return `${segment()}-${segment()}-${segment()}`;
}

module.exports = {
  generateAdminId,
  generateInviteKey,
  generateRecoveryKey,
};
