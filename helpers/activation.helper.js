const crypto = require("crypto");

// Faollashtirish kodi yaratish
const generateActivationCode = () => {
  return crypto.randomInt(100000, 999999).toString(); // 6 xonali kod
};

// Faollashtirish tokeni yaratish
const generateActivationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Token muddatini tekshirish
const isTokenExpired = (createdAt, expirationTime = 24 * 60 * 60 * 1000) => {
  return Date.now() - new Date(createdAt).getTime() > expirationTime;
};

module.exports = {
  generateActivationCode,
  generateActivationToken,
  isTokenExpired,
};
