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
const {
  adminGuard,
  ownerGuard,
  selfGuard,
  creatorGuard,
} = require("../middlewares/guards");
const router = require("express").Router();

router.post(
  "/",
  adminGuard,
  ownerGuard,
  validate(createCourseSchema),
  addCourse
);
router.get("/", adminGuard, ownerGuard, getAllCourses);
router.get("/:id", adminGuard, ownerGuard, getCourseById);
router.put("/:id", adminGuard, validate(updateCourseSchema), updateCourseById);
router.delete("/:id", adminGuard, deleteCourseById);

module.exports = router;
