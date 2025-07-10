const { sendMail } = require("../common/otp");
const { response } = require("../middlewares/app");
const Otp = require("../models/otp.model");
const User = require("../models/user.model");
const errorHandler = require("../utils/error.handler");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  const userExists = await User.findOne({ where: { email: data.email } });
  if (userExists) throw new Error("User already registered");

  const code = Math.floor(Math.random() * 100000);
  await Otp.create({ email: data.email, code });
  await sendMail(data.email, code.toString());
  const userCraeted = (await User.create(data)).toJSON();
  delete userCraeted.refreshToken;
  delete userCraeted.password;
  delete userCraeted.role;
  return "Successfully registered Please check your email we have sent you confirmation code!";
};

const activateAccount = async (data) => {
  const { email, code } = data;
  const userExists = await User.findOne({ where: { email } });
  const emailExists = await Otp.findOne({ where: { email } });
  if (!userExists || !emailExists) throw new Error("Email is invalid");

  const compareCode = await emailExists.validCode(code, emailExists.code);
  if (!compareCode) throw new Error("Invalid code please try again");

  userExists.status = "ACTIVE";
  await userExists.save({ hooks: true });
  await Otp.destroy({ where: { id: emailExists.id } });
  return "Successfully activated";
};

const loginUser = async (data) => {
  const userExists = await User.findOne({
    where: { email: data.email, status: "ACTIVE" },
  });
  if (!userExists) throw new Error("Invalid email or passowrd");
  const comparePassword = await userExists.validPassword(
    data.password,
    userExists.password
  );
  if (!comparePassword) throw new Error("Invalid email or password");
  const payload = {
    id: userExists.id,
    role: userExists.role,
  };

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXP,
  });
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  });

  userExists.refreshToken = refreshToken;
  await userExists.save({ hooks: true });

  return { refreshToken, accessToken };
};

const logoutUser = async (token) => {
  const verifyToken = await jwt.verify(token, process.env.REFRESH_TOKEN_KEY);

  const userExists = await User.findOne({ where: { refreshToken: token } });
  if (!userExists || verifyToken.id !== userExists.id)
    throw new Error("Token is invalid");

  userExists.refreshToken = null;
  await userExists.save({ hooks: true });

  return "Successfully logged out";
};

module.exports = { registerUser, loginUser, activateAccount, logoutUser };
