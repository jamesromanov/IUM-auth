const Joi = require("joi");

const registerValidator = Joi.object({
  name: Joi.string().min(4).max(40),
  email: Joi.string().email().min(5).max(40).required(),
  password: Joi.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .min(8)
    .max(30)
    .required(),
  role: Joi.string()
    .valid("USER", "ADMIN")
    .default("USER")
    .min(4)
    .max(6)
    .optional(),
  status: Joi.string()
    .valid("INACTIVE", "ACTIVE", "DELETED")
    .default("INACTIVE")
    .min(5)
    .max(10)
    .optional(),
  refreshToken: Joi.string().min(5).optional(),
});

const loginValidator = Joi.object({
  email: Joi.string()
    .required()
    .min(6)
    .max(40)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  password: Joi.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .min(8)
    .max(30)
    .required(),
});
module.exports = { registerValidator, loginValidator };
