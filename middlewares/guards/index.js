const authenticateToken = require("../authMiddleware");
const adminGuard = require("./admin.guard");
const creatorGuard = require("./creator.guard");
const selfGuard = require("./self.guard");
const clientGuard = require("./client.guard");
const ownerGuard = require("./owner.guard");

module.exports = {
  authenticateToken,
  adminGuard,
  creatorGuard,
  selfGuard,
  clientGuard,
  ownerGuard,
};
