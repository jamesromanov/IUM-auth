const User = require("../models/user.model");
const errorHandler = require("../utils/error.handler");

const registerUser = async (data) => {
  return await User.create(data);
};

module.exports = { registerUser };
