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

const router = require("express").Router();

router.post("/", validate(createSubjectSchema), addSubject);
router.get("/", getAllSubjects);
router.get("/:id", getSubjectById);
router.put("/:id", validate(updateSubjectSchema), updateSubjectById);
router.delete("/:id", deleteSubjectById);

module.exports = router;
