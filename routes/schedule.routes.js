const {
  addSchedule,
  getAllSchedules,
  getScheduleById,
  updateScheduleById,
  deleteScheduleById,
} = require("../controllers/schedule.controller");
const validate = require("../middlewares/validate");
const {
  createScheduleSchema,
  updateScheduleSchema,
} = require("../validations/schedule.validation");

const router = require("express").Router();

router.post("/", validate(createScheduleSchema), addSchedule);
router.get("/", getAllSchedules);
router.get("/:id", getScheduleById);
router.put("/:id", validate(updateScheduleSchema), updateScheduleById);
router.delete("/:id", deleteScheduleById);

module.exports = router;
