const {
  createAdmin,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
const {
  creatorGuard,
  selfGuard,
  adminGuard,
} = require("../middlewares/guards");
const validate = require("../middlewares/validate");
const {
  adminRegisterSchema,
  adminUpdateSchema,
} = require("../validations/admin.validation");
const router = require("express").Router();

router.post("/", creatorGuard, validate(adminRegisterSchema), createAdmin);
router.get("/", adminGuard, getAllAdmin);
router.get("/:id", adminGuard, getAdminById);
router.put(
  "/:id",
  creatorGuard,
  selfGuard,
  validate(adminUpdateSchema),
  updateAdmin
);
router.delete("/:id", creatorGuard, deleteAdmin);

module.exports = router;
