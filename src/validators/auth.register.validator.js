const Joi = require("joi");

const registerValidator = Joi.isSchema({
  name: Joi.string().min(4).max(40),
  email: Joi.string().email().min(5).mex(40).required(),
  password: Joi.string()
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/
    )
    .min(1)
    .max(30)
    .required(),
  role: Joi.string().valid("USER", "ADMIN").min(4).max(6).optional(),
  status: Joi.string()
    .valid("INACTIVE", "ACTIVE", "DELETED")
    .min(5)
    .max(10)
    .optional(),
});

module.exports = registerValidator;
