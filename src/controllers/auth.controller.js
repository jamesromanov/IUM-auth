const { response } = require("../utils/response");
const errorHandler = require("../utils/error.handler");
const {
  registerUser,
  loginUser,
  activateAccount,
  logoutUser,
} = require("../services/auth.service");
const {
  registerValidator,
  loginValidator,
  activateValidator,
} = require("../validators/auth.register.validator");

const register = errorHandler(async (req, res, next) => {
  const body = req.body;
  const { error, value } = registerValidator.validate(body);
  if (error) return response(res, error.details[0].message, 400);
  const user = await registerUser(value);
  response(res, user, 201);
});

const activateAcc = errorHandler(async (req, res, next) => {
  const body = req.body;
  const { error, value } = activateValidator.validate(body);
  if (error) return response(res, error.details[0].message, 400);

  try {
    const otpCheck = await activateAccount(value);
    response(res, otpCheck, 201);
  } catch (error) {
    return response(res, "Invalid code or email", 400);
  }
});
const login = errorHandler(async (req, res, next) => {
  const body = req.body;
  const { error, value } = loginValidator.validate(body);
  if (error) return response(res, error.details[0].message, 400);
  const loginData = await loginUser(value);
  const options = {
    maxAge: eval(process.env.COOKIE_EXP),
    secure: false,
  };
  res.cookie("token", loginData.refreshToken, options);
  response(res, loginData);
});

const logout = errorHandler(async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) throw new Error("Token is invalid");

  const logoutData = await logoutUser(token);
  const options = {
    maxAge: eval(process.env.COOKIE_EXP),
    secure: false,
  };
  res.clearCookie("jwt", options);
  response(res, logoutData, 201);
});

module.exports = { register, login, activateAcc, logout };
