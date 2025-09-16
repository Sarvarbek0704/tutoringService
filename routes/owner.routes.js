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
  adminGuard,
  ownerGuard,
  selfGuard,
  creatorGuard,
} = require("../middlewares/guards");
const router = require("express").Router();

router.post("/", adminGuard, validate(createOwnerSchema), addOwner);
router.get("/", adminGuard, getAllOwners);
router.get("/:id", adminGuard, selfGuard, getOwnerById);
router.put(
  "/:id",
  adminGuard,
  selfGuard,
  validate(updateOwnerSchema),
  updateOwnerById
);
router.delete("/:id", adminGuard, deleteOwnerById);

module.exports = router;
