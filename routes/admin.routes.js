const {
  createAdmin,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");

const validate = require("../middlewares/validate");
const {
  adminRegisterSchema,
  adminUpdateSchema,
} = require("../validations/admin.validation");
const router = require("express").Router();

router.post("/", validate(adminRegisterSchema), createAdmin);
router.get("/", getAllAdmin);
router.get("/:id", getAdminById);
router.put("/:id", validate(adminUpdateSchema), updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
