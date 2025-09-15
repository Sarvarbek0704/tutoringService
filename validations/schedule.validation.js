const Joi = require("joi");

const createScheduleSchema = Joi.object({
  course_id: Joi.number().integer().positive().required(),
  day_of_week: Joi.string().max(50).required(),
  start_time: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  end_time: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
});

const updateScheduleSchema = Joi.object({
  course_id: Joi.number().integer().positive().optional(),
  day_of_week: Joi.string().max(50).optional(),
  start_time: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),
  end_time: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),
}).min(1);

module.exports = {
  createScheduleSchema,
  updateScheduleSchema,
};
