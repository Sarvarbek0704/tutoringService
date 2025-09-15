const Joi = require("joi");

const createEnrollmentSchema = Joi.object({
  contract_id: Joi.number().integer().positive().required(),
  student_id: Joi.number().integer().positive().required(),
  course_id: Joi.number().integer().positive().required(),
  status: Joi.string()
    .max(18)
    .valid("active", "completed", "cancelled", "pending")
    .required(),
  enrolled_at: Joi.date().iso().optional(),
  canceled_at: Joi.date().iso().optional().allow(null),
});

const updateEnrollmentSchema = Joi.object({
  contract_id: Joi.number().integer().positive().optional(),
  student_id: Joi.number().integer().positive().optional(),
  course_id: Joi.number().integer().positive().optional(),
  status: Joi.string()
    .max(18)
    .valid("active", "completed", "cancelled", "pending")
    .optional(),
  enrolled_at: Joi.date().iso().optional(),
  canceled_at: Joi.date().iso().optional().allow(null),
}).min(1);

module.exports = {
  createEnrollmentSchema,
  updateEnrollmentSchema,
};
