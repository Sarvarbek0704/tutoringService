const Course = require("../models/course");

const addCourse = async (req, res, next) => {
  try {
    const { subject_id, owner_id, name, level, price, duration_weeks } =
      req.body;

    const newCourse = await Course.create({
      subject_id,
      owner_id,
      name,
      level,
      price,
      duration_weeks,
    });
    res.status(201).send({
      message: "new course added",
      data: newCourse,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.status(201).send({
      message: "All courses",
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    res.status(200).send({
      message: `Course number ${id}`,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.update(req.body, {
      where: { id },
      returning: true,
    });
    console.log(course);
    res.status(200).send({
      message: "course updated",
      data: course[1][0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Course.destroy({
      where: { id },
    });
    res.status(200).send({
      message: "Course deleted",
      data: id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
