const Joi = require("joi");

const createSubjectSchema = Joi.object({
  name: Joi.string().max(70).required(),
  description: Joi.string().optional().allow(null, ""),
});

const updateSubjectSchema = Joi.object({
  name: Joi.string().max(70).optional(),
  description: Joi.string().optional().allow(null, ""),
}).min(1);

module.exports = {
  createSubjectSchema,
  updateSubjectSchema,
};
