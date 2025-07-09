const { response } = require("../utils/response");
const errorHandler = require("../utils/error.handler");
const { registerUser } = require("../services/auth.service");

const register = errorHandler(async (req, res, next) => {
  const body = req.body;
  const user = await registerUser(body);
  response(res, user, 201);
});

module.exports = { register };
