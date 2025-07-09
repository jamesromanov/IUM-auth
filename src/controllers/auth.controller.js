const { response } = require("../utils/response");
const errorHandler = require("../utils/error.handler");
const { registerUser } = require("../services/auth.service");
const registerValidator = require("../validators/auth.register.validator");

const register = errorHandler(async (req, res, next) => {
  const body = req.body;
  const { error, value } = registerValidator.validate(body);
  if (error) return response(res, error.details[0].message, 400);
  const user = await registerUser(body);
  response(res, user, 201);
});

module.exports = { register };
