const adminGuard = require("./admin.guard");
const ownerGuard = require("./owner.guard");
const clientGuard = require("./client.guard");
const creatorGuard = require("./creator.guard");
const selfGuard = require("./self.guard");

module.exports = {
  adminGuard,
  ownerGuard,
  clientGuard,
  creatorGuard,
  selfGuard,
};
