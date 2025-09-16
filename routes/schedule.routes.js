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
  validate(createScheduleSchema),
  addSchedule
);
router.get("/", authenticateToken, adminGuard, getAllSchedules);
router.get("/:id", authenticateToken, adminGuard, getScheduleById);
router.put(
  "/:id",
  authenticateToken,
  adminGuard,
  validate(updateScheduleSchema),
  updateScheduleById
);
router.delete("/:id", authenticateToken, adminGuard, deleteScheduleById);

module.exports = router;
