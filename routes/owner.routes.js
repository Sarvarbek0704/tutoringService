const {
  addOwner,
  getAllOwners,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
} = require("../controllers/owner.controller");
const validate = require("../middlewares/validate");
const {
  createOwnerSchema,
  updateOwnerSchema,
} = require("../validations/owner.validation");
const {
  authenticateToken,
  adminGuard,
  ownerGuard,
  selfGuard,
  creatorGuard,
} = require("../middlewares/guards");
const router = require("express").Router();

router.post(
  "/",
  authenticateToken,
  adminGuard,
  validate(createOwnerSchema),
  addOwner
);
router.get("/", authenticateToken, adminGuard, getAllOwners);
router.get("/:id", authenticateToken, adminGuard, selfGuard, getOwnerById);
router.put(
  "/:id",
  authenticateToken,
  adminGuard,
  selfGuard,
  validate(updateOwnerSchema),
  updateOwnerById
);
router.delete("/:id", authenticateToken, adminGuard, deleteOwnerById);

module.exports = router;
