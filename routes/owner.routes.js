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

const router = require("express").Router();

router.post("/", validate(createOwnerSchema), addOwner);
router.get("/", getAllOwners);
router.get("/:id", getOwnerById);
router.put("/:id", validate(updateOwnerSchema), updateOwnerById);
router.delete("/:id", deleteOwnerById);

module.exports = router;
