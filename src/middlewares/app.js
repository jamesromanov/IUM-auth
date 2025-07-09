const cookieParser = require("cookie-parser");
const express = require("express");
const err = require("../utils/err");
const authRouter = require("../routes/auth.router");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(err);
app.use("/", authRouter);

module.exports = app;
