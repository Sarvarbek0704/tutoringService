const {
  addSubject,
  getAllSubjects,
  getSubjectById,
  updateSubjectById,
  deleteSubjectById,
} = require("../controllers/subject.controller");
const validate = require("../middlewares/validate");
const {
  createSubjectSchema,
  updateSubjectSchema,
} = require("../validations/subject.validation");
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
  validate(createSubjectSchema),
  addSubject
);
router.get("/", authenticateToken, adminGuard, getAllSubjects);
router.get("/:id", authenticateToken, adminGuard, getSubjectById);
router.put(
  "/:id",
  authenticateToken,
  adminGuard,
  validate(updateSubjectSchema),
  updateSubjectById
);
router.delete("/:id", authenticateToken, adminGuard, deleteSubjectById);

module.exports = router;
