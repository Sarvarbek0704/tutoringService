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
const {
  adminGuard,
  ownerGuard,
  selfGuard,
  creatorGuard,
} = require("../middlewares/guards");
const router = require("express").Router();

router.post("/", adminGuard, validate(createScheduleSchema), addSchedule);
router.get("/", adminGuard, getAllSchedules);
router.get("/:id", adminGuard, getScheduleById);
router.put(
  "/:id",
  adminGuard,
  validate(updateScheduleSchema),
  updateScheduleById
);
router.delete("/:id", adminGuard, deleteScheduleById);

module.exports = router;
