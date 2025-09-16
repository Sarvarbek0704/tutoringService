const { cli } = require("winston/lib/winston/config");
const Enrollment = require("../models/enrollment");

const addEnrollment = async (req, res, next) => {
  try {
    const {
      student_id,
      course_id,
      status,
      enrolled_at,
      cancelled_at,
      contract_id,
    } = req.body;

    const newEnrollment = await Enrollment.create({
      student_id,
      contract_id,
      course_id,
      status,
      enrolled_at,
      cancelled_at,
    });
    await newEnrollment.save();
    res.status(201).send({
      message: "new enrollment added",
      data: newEnrollment,
    });
  } catch (error) {
    next(error);
  }
};

const getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.status(201).send({
      message: "All enrollments",
      data: enrollments,
    });
  } catch (error) {
    next(error);
  }
};

const getEnrollmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);
    res.status(200).send({
      message: `Enrollment number ${id}`,
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

const updateEnrollmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.update(req.body, {
      where: { id },
      returning: true,
    });
    console.log(enrollment);
    res.status(200).send({
      message: "enrollment updated",
      data: enrollment[1][0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteEnrollmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Enrollment.destroy({
      where: { id },
    });
    res.status(200).send({
      message: "Enrollment deleted",
      data: id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollmentById,
  deleteEnrollmentById,
};
