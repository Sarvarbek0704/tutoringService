const { cli } = require("winston/lib/winston/config");
const Certificate = require("../models/certificate");

const addCertificate = async (req, res) => {
  try {
    const { student_id, course_id, issued_date, grade } = req.body;
    const newCertificate = await Certificate.create({
      student_id,
      course_id,
      issued_date,
      grade,
    });
    await newCertificate.save();
    res.status(201).send({
      message: "new certificate added",
      data: newCertificate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding certificate" });
  }
};

const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.findAll();
    res.status(201).send({
      message: "All certificates",
      data: certificates,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing all certificates" });
  }
};

const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findByPk(id);
    res.status(200).send({
      message: `Certificate number ${id}`,
      data: certificate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing one certificate" });
  }
};

const updateCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.update(req.body, {
      where: { id },
      returning: true,
    });
    console.log(certificate);
    res.status(200).send({
      message: "certificate updated",
      data: certificate[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while updating certificate" });
  }
};

const deleteCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    await Certificate.destroy({
      where: { id },
    });
    res.status(200).send({
      message: "Certificate deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while deleting certificate" });
  }
};

module.exports = {
  addCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificateById,
  deleteCertificateById,
};
