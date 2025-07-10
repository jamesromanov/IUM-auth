const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const authRouter = express.Router();
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: User register!
 *     tags: [Users]
 *     description: This is user register method
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Users'
 *     responses:
 *         201:
 *           description: registered successfully
 *         500:
 *           description: Internal server error
 *         400:
 *           description: Invalid data entered
 */
authRouter.route("/auth/register").post(register);

authRouter.route("/auth/login").post(login);

module.exports = authRouter;
