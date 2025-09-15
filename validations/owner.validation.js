const Joi = require("joi");

const createOwnerSchema = Joi.object({
  full_name: Joi.string().max(50).required(),
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(6).required(),
  confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  phone: Joi.string().max(20).optional().allow(null, ""),
  specialization: Joi.string().max(100).optional().allow(null, ""),
  created_at: Joi.date().iso().optional(),
  accessToken: Joi.string().optional().allow(null, ""),
  refreshToken: Joi.string().optional().allow(null, ""),
  status: Joi.boolean().optional(),
});

const updateOwnerSchema = Joi.object({
  full_name: Joi.string().max(50).optional(),
  email: Joi.string().email().max(50).optional(),
  password: Joi.string().min(6).optional(),
  confirm_password: Joi.string().valid(Joi.ref("password")).optional(),
  phone: Joi.string().max(20).optional().allow(null, ""),
  specialization: Joi.string().max(100).optional().allow(null, ""),
  created_at: Joi.date().iso().optional(),
  accessToken: Joi.string().optional().allow(null, ""),
  refreshToken: Joi.string().optional().allow(null, ""),
  status: Joi.boolean().optional(),
}).min(1);

module.exports = {
  createOwnerSchema,
  updateOwnerSchema,
};
