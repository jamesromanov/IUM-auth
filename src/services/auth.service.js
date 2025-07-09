const { response } = require("../middlewares/app");
const User = require("../models/user.model");
const errorHandler = require("../utils/error.handler");

const registerUser = async (data) => {
  const userExists = await User.findOne({ where: { email: data.email } });
  if (userExists) throw new Error("User already registered");
  const userCraeted = (await User.create(data)).toJSON();
  delete userCraeted.refreshToken;
  delete userCraeted.password;
  delete userCraeted.role;
  return userCraeted;
};

const loginUser = async (data) => {
  const userExists = await User.findOne({ where: { email: data.email } });
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
};

module.exports = { registerUser, loginUser };
