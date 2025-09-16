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
  adminGuard,
  ownerGuard,
  selfGuard,
  creatorGuard,
} = require("../middlewares/guards");
const router = require("express").Router();

router.post("/", adminGuard, validate(createEnrollmentSchema), addEnrollment);
router.get("/", adminGuard, getAllEnrollments);
router.get("/:id", adminGuard, getEnrollmentById);
router.put(
  "/:id",
  adminGuard,
  validate(updateEnrollmentSchema),
  updateEnrollmentById
);
router.delete("/:id", adminGuard, deleteEnrollmentById);

module.exports = router;
