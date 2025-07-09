const { response } = require("../utils/response");
const errorHandler = require("../utils/error.handler");
const { registerUser, loginUser } = require("../services/auth.service");
const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.register.validator");

const register = errorHandler(async (req, res, next) => {
  const body = req.body;
  const { error, value } = registerValidator.validate(body);
  if (error) return response(res, error.details[0].message, 400);
  const user = await registerUser(body);
  response(res, user, 201);
});

const login = errorHandler(async (req, res, next) => {
  const body = req.body;
  const { error, value } = loginValidator.validate(body);
  if (error) return response(res, error.details[0].message, 400);
  const user = await loginUser(body);
  response(res, user);
});

module.exports = { register, login };
