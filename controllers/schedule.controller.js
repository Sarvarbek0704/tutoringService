const Schedule = require("../models/shedule");

const addSchedule = async (req, res, next) => {
  try {
    const { day_of_week, course_id, start_time, end_time } = req.body;

    const newSchedule = await Schedule.create({
      day_of_week,
      course_id,
      start_time,
      end_time,
    });
    await newSchedule.save();
    res.status(201).send({
      message: "new schedule added",
      data: newSchedule,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSchedules = async (req, res, next) => {
  try {
    const schedules = await Schedule.findAll();
    res.status(201).send({
      message: "All schedules",
      data: schedules,
    });
  } catch (error) {
    next(error);
  }
};

const getScheduleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByPk(id);
    res.status(200).send({
      message: `Schedule number ${id}`,
      data: schedule,
    });
  } catch (error) {
    next(error);
  }
};

const updateScheduleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.update(req.body, {
      where: { id },
      returning: true,
    });
    console.log(schedule);
    res.status(200).send({
      message: "schedule updated",
      data: schedule[1][0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteScheduleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Schedule.destroy({
      where: { id },
    });
    res.status(200).send({
      message: "Schedule deleted",
      data: id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSchedule,
  getAllSchedules,
  getScheduleById,
  updateScheduleById,
  deleteScheduleById,
};
