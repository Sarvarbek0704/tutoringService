const {
  createAdmin,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
const {
  authenticateToken,
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

router.post(
  "/",
  authenticateToken,
  creatorGuard,
  validate(adminRegisterSchema),
  createAdmin
);
router.get("/", authenticateToken, adminGuard, getAllAdmin);
router.get("/:id", authenticateToken, adminGuard, getAdminById);
router.put(
  "/:id",
  authenticateToken,
  creatorGuard,
  selfGuard,
  validate(adminUpdateSchema),
  updateAdmin
);
router.delete("/:id", authenticateToken, creatorGuard, deleteAdmin);

module.exports = router;
