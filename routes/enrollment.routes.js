const {
  addEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollmentById,
  deleteEnrollmentById,
} = require("../controllers/enrollment.controller");
const validate = require("../middlewares/validate");
const {
  createEnrollmentSchema,
  updateEnrollmentSchema,
} = require("../validations/enrollment.validation");
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
  validate(createEnrollmentSchema),
  addEnrollment
);
router.get("/", authenticateToken, adminGuard, getAllEnrollments);
router.get("/:id", authenticateToken, adminGuard, getEnrollmentById);
router.put(
  "/:id",
  authenticateToken,
  adminGuard,
  validate(updateEnrollmentSchema),
  updateEnrollmentById
);
router.delete("/:id", authenticateToken, adminGuard, deleteEnrollmentById);

module.exports = router;
