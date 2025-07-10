const cookieParser = require("cookie-parser");
const express = require("express");
const err = require("../utils/err");
const authRouter = require("../routes/auth.router");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../../swagger");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(err);
app.use("/api/v1", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
