const {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/course.controller");
const validate = require("../middlewares/validate");
const {
  createCourseSchema,
  updateCourseSchema,
} = require("../validations/course.validation");

const router = require("express").Router();

router.post("/", validate(createCourseSchema), addCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", validate(updateCourseSchema), updateCourseById);
router.delete("/:id", deleteCourseById);

module.exports = router;
