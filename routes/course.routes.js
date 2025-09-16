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
  ownerGuard,
  validate(createCourseSchema),
  addCourse
);
router.get("/", authenticateToken, adminGuard, ownerGuard, getAllCourses);
router.get("/:id", authenticateToken, adminGuard, ownerGuard, getCourseById);
router.put(
  "/:id",
  authenticateToken,
  adminGuard,
  validate(updateCourseSchema),
  updateCourseById
);
router.delete("/:id", authenticateToken, adminGuard, deleteCourseById);

module.exports = router;
