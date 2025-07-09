const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  dialect: "postgres",
  logging: false,
});

async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log("Db connected successfully!");
  } catch (error) {
    console.log("Db connection error", error);
  }
}
module.exports = { sequelize, connectDb };
