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
  adminGuard,
  ownerGuard,
  selfGuard,
  creatorGuard,
} = require("../middlewares/guards");
const router = require("express").Router();

router.post("/", adminGuard, validate(createSubjectSchema), addSubject);
router.get("/", adminGuard, getAllSubjects);
router.get("/:id", adminGuard, getSubjectById);
router.put(
  "/:id",
  adminGuard,
  validate(updateSubjectSchema),
  updateSubjectById
);
router.delete("/:id", adminGuard, deleteSubjectById);

module.exports = router;
