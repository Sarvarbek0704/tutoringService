const Joi = require("joi");

const createCourseSchema = Joi.object({
  subject_id: Joi.number().integer().positive().required(),
  owner_id: Joi.number().integer().positive().required(),
  name: Joi.string().max(50).required(),
  level: Joi.string().max(50).optional().allow(null, ""),
  price: Joi.number().precision(2).min(0).required(),
  duration_weeks: Joi.number().integer().min(1).required(),
  created_at: Joi.date().iso().optional(),
});

const updateCourseSchema = Joi.object({
  subject_id: Joi.number().integer().positive().optional(),
  owner_id: Joi.number().integer().positive().optional(),
  name: Joi.string().max(50).optional(),
  level: Joi.string().max(50).optional().allow(null, ""),
  price: Joi.number().precision(2).min(0).optional(),
  duration_weeks: Joi.number().integer().min(1).optional(),
  created_at: Joi.date().iso().optional(),
}).min(1);

module.exports = {
  createCourseSchema,
  updateCourseSchema,
};
