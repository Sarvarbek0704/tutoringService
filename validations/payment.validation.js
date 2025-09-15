const Joi = require("joi");

const createPaymentSchema = Joi.object({
  student_id: Joi.number().integer().positive().required(),
  course_id: Joi.number().integer().positive().required(),
  contract_id: Joi.number().integer().positive().required(),
  amount: Joi.number().precision(2).min(0).required(),
  payment_date: Joi.date().iso().optional(),
  status: Joi.string()
    .max(18)
    .valid("paid", "unpaid", "pending", "failed", "refunded")
    .optional(),
});

const updatePaymentSchema = Joi.object({
  student_id: Joi.number().integer().positive().optional(),
  course_id: Joi.number().integer().positive().optional(),
  contract_id: Joi.number().integer().positive().optional(),
  amount: Joi.number().precision(2).min(0).optional(),
  payment_date: Joi.date().iso().optional(),
  status: Joi.string()
    .max(18)
    .valid("paid", "unpaid", "pending", "failed", "refunded")
    .optional(),
}).min(1);

module.exports = {
  createPaymentSchema,
  updatePaymentSchema,
};
