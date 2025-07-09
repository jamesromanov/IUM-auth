import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import { READONLY } from "sqlite3";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: true },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isValidEmail(email) {
          if (!validator.isEmail(email)) throw new Error("Email is invalid");
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidPassword(pass) {
          if (!validator.isStrongPassword(pass))
            throw new Error(
              "Password is too weak must contain one lowercase one uppercase and one number and one symbol at least"
            );
        },
      },
    },
    role: {
      type: DataTypes.ENUM("USER", "ADMIN"),
      defaulValue: "USER",
    },
    status: {
      type: DataTypes.ENUM("INACTIVE", "ACTIVE", "DELETED"),
      defaulValue: "INACTIVE",
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);
