const Subject = require("../models/subject");

const addSubject = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newSubject = await Subject.create({
      name,
      description,
    });
    await newSubject.save();
    res.status(201).send({
      message: "new subject added",
      data: newSubject,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.findAll();
    res.status(201).send({
      message: "All subjects",
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};

const getSubjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);
    res.status(200).send({
      message: `Subject number ${id}`,
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

const updateSubjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subject = await Subject.update(req.body, {
      where: { id },
      returning: true,
    });
    console.log(subject);
    res.status(200).send({
      message: "subject updated",
      data: subject[1][0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteSubjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Subject.destroy({
      where: { id },
    });
    res.status(200).send({
      message: "Subject deleted",
      data: id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSubject,
  getAllSubjects,
  getSubjectById,
  updateSubjectById,
  deleteSubjectById,
};
