const { cli } = require("winston/lib/winston/config");
const Schedule = require("../models/shedule");

const addSchedule = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error adding schedule" });
  }
};

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.status(201).send({
      message: "All schedules",
      data: schedules,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing all schedules" });
  }
};

const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByPk(id);
    res.status(200).send({
      message: `Schedule number ${id}`,
      data: schedule,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing one schedule" });
  }
};

const updateScheduleById = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error while updating schedule" });
  }
};

const deleteScheduleById = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error while deleting schedule" });
  }
};

module.exports = {
  addSchedule,
  getAllSchedules,
  getScheduleById,
  updateScheduleById,
  deleteScheduleById,
};
