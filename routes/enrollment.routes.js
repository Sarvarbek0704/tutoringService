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

const router = require("express").Router();

router.post("/", validate(createEnrollmentSchema), addEnrollment);
router.get("/", getAllEnrollments);
router.get("/:id", getEnrollmentById);
router.put("/:id", validate(updateEnrollmentSchema), updateEnrollmentById);
router.delete("/:id", deleteEnrollmentById);

module.exports = router;
