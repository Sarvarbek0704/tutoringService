const Joi = require("joi");

const createCertificateSchema = Joi.object({
  student_id: Joi.number().integer().required(),
  course_id: Joi.number().integer().required(),
  issued_date: Joi.date().optional(),
  grade: Joi.string().max(50).optional(),
});

const updateCertificateSchema = Joi.object({
  student_id: Joi.number().integer().optional(),
  course_id: Joi.number().integer().optional(),
  issued_date: Joi.date().optional(),
  grade: Joi.string().max(50).optional(),
}).min(1);

module.exports = {
  createCertificateSchema,
  updateCertificateSchema,
};
