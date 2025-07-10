const { required } = require("joi");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express auth Api!",
      version: "1.0.0",
      definition: "This is simple auth tryout for the task!",
    },
    schemes: {
      Users: {
        type: "object",
        required: ["email", "password"],
        properties: {
          name: {
            type: "string",
            description: "User name",
          },
          email: {
            type: "string",
            required: true,
            description: "User email",
          },
          password: {
            type: "string",
            required: true,
            description: "User password",
          },
          status: {
            type: "string",
            enum: ["INACTIVE", "ACTIVE", "DELETED"],
            description: "User status",
          },
          role: {
            type: "string",
            enum: ["USER", "ADMIN"],
            description: "User role",
          },
        },
        exmaple: {
          name: "someone",
          email: "exmaple@gmail.com",
          password: "strongPassword1@#",
          role: "USER",
        },
      },
      UserLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            description: "User email",
          },
          password: {
            type: "string",
            description: "User password",
          },
          exmaple: {
            email: "exmaple@gmail.com",
            password: "strongPassword1@#",
          },
        },
      },
    },
    tags: [
      {
        name: "Auth",
        description: "User register and login",
      },
    ],
  },
  apis: ["./swagger.js", "./src/routes/*.js"],
});

module.exports = swaggerSpec;
