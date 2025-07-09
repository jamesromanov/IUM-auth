const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const validator = require("validator");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "users",
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

User.beforeCreate(async (user, options) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
});
User.beforeUpdate(async (user, options) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
});
sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch((err) => console.log("Error while creeting table:", err));
module.exports = User;
