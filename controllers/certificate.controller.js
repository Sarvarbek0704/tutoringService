const Certificate = require("../models/certificate");

const addCertificate = async (req, res, next) => {
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
    next(error);
  }
};

const getAllCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.findAll();
    res.status(201).send({
      message: "All certificates",
      data: certificates,
    });
  } catch (error) {
    next(error);
  }
};

const getCertificateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findByPk(id);
    res.status(200).send({
      message: `Certificate number ${id}`,
      data: certificate,
    });
  } catch (error) {
    next(error);
  }
};

const updateCertificateById = async (req, res, next) => {
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
    next(error);
  }
};

const deleteCertificateById = async (req, res, next) => {
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
    next(error);
  }
};

module.exports = {
  addCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificateById,
  deleteCertificateById,
};
