const { cli } = require("winston/lib/winston/config");
const Subject = require("../models/subject");

const addSubject = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error adding subject" });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(201).send({
      message: "All subjects",
      data: subjects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing all subjects" });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);
    res.status(200).send({
      message: `Subject number ${id}`,
      data: subject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing one subject" });
  }
};

const updateSubjectById = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error while updating subject" });
  }
};

const deleteSubjectById = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error while deleting subject" });
  }
};

module.exports = {
  addSubject,
  getAllSubjects,
  getSubjectById,
  updateSubjectById,
  deleteSubjectById,
};
