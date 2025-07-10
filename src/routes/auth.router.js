const express = require("express");
const {
  register,
  login,
  activateAcc,
  logout,
} = require("../controllers/auth.controller");

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
/**
 * @swagger
 * /api/v1/auth/activate:
 *   post:
 *     summary: User activate!
 *     tags: [Users]
 *     description: This is user activate
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/UserActivate'
 *     responses:
 *         201:
 *           description: activated successfully
 *         500:
 *           description: Internal server error
 *         400:
 *           description: Invalid data entered
 */
authRouter.route("/auth/activate").post(activateAcc);
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login!
 *     tags: [Users]
 *     description: This is user login
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/UserLogin'
 *     responses:
 *         201:
 *           description: logged in successfully
 *         500:
 *           description: Internal server error
 *         400:
 *           description: Invalid data entered
 */
authRouter.route("/auth/login").post(login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: User logout!
 *     tags: [Users]
 *     description: This is user logour
 *     responses:
 *         201:
 *           description: logged out successfully
 *         500:
 *           description: Internal server error
 *         400:
 *           description: Invalid data entered
 */
authRouter.route("/auth/logout").post(logout);

module.exports = authRouter;
