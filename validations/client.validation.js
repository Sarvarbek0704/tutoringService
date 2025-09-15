const Joi = require("joi");

const createClientSchema = Joi.object({
  full_name: Joi.string().max(50).required(),
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(6).required(),
  confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  phone: Joi.string()
    .pattern(/^[0-9+\-() ]{7,20}$/)
    .optional(),
  birth_date: Joi.date().less("now").optional(),
  status: Joi.boolean().optional(),
});

const updateClientSchema = Joi.object({
  full_name: Joi.string().max(50).optional(),
  email: Joi.string().email().max(50).optional(),
  password: Joi.string().min(6).optional(),
  confirm_password: Joi.string().valid(Joi.ref("password")).optional(),
  phone: Joi.string()
    .pattern(/^[0-9+\-() ]{7,20}$/)
    .optional(),
  birth_date: Joi.date().less("now").optional(),
  status: Joi.boolean().optional(),
}).min(1);

module.exports = {
  createClientSchema,
  updateClientSchema,
};
