const Joi = require("joi");

const createContractSchema = Joi.object({
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().greater(Joi.ref("start_date")).required(),
  status: Joi.string()
    .max(18)
    .valid("process", "active", "completed", "cancelled")
    .optional(),
  created_at: Joi.date().iso().optional(),
});

const updateContractSchema = Joi.object({
  start_date: Joi.date().iso().optional(),
  end_date: Joi.date().iso().optional(),
  status: Joi.string()
    .max(18)
    .valid("process", "active", "completed", "cancelled")
    .optional(),
  created_at: Joi.date().iso().optional(),
}).min(1);

module.exports = {
  createContractSchema,
  updateContractSchema,
};
