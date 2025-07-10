const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

const Otp = sequelize.define(
  "otp",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidEmail(email) {
          if (!validator.isEmail(email)) throw new Error("Email is invalid");
        },
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },

  {
    tableName: "otp",
    timestamps: true,
    instanceMethods: {
      validCode: (code) => {
        return jwt.verify(this.code, code);
      },
    },
  }
);

Otp.prototype.validCode = (code, hash) => {
  return jwt.verify(hash, code);
};

(err) => console.log("Error while creeting table:", err);

Otp.beforeCreate(async (data, options) => {
  if (data.changed("code")) {
    data.code = await jwt.sign({ code: data.code }, data.code.toString(), {
      expiresIn: process.env.CODE_EXP,
    });
  }
});
Otp.beforeUpdate(async (data, options) => {
  if (data.changed("code")) {
    data.code = await jwt.sign({ code: data.code }, data.code.toString(), {
      expiresIn: process.env.CODE_EXP,
    });
  }
});

sequelize.sync({ alter: true }).then(() => {
  console.log("Table created successfully!");
}).catch;

module.exports = Otp;
