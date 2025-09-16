const crypto = require("crypto");

const generateActivationCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};
