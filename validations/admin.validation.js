const Joi = require("joi");

const adminRegisterSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9+\-() ]{7,20}$/)
    .required(),
  password: Joi.string().min(6).required(),
  confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  is_creator: Joi.boolean().optional(),
}).custom((value, helpers) => {
  delete value.confirm_password;
  return value;
});

const adminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const adminUpdateSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^[0-9+\-() ]{7,20}$/)
    .optional(),
  password: Joi.string().min(6).optional(),
  is_creator: Joi.boolean().optional(),
  status: Joi.boolean().optional(),
});

module.exports = {
  adminRegisterSchema,
  adminLoginSchema,
  adminUpdateSchema,
};
