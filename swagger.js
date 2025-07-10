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
    components: {
      schemas: {
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
          example: {
            name: "someone",
            email: "exmaple@gmail.com",
            password: "strongPassword1@#",
            role: "USER",
          },
        },
        UserActivate: {
          type: "object",
          require: ["email", "code"],
          properties: {
            email: {
              type: "string",
              description: "User email",
            },
            code: {
              type: "string",
              description: "User email verification code",
            },
          },
          example: {
            email: "someone@gmail.com",
            code: "XXXXX",
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
          },
          example: {
            email: "exmaple@gmail.com",
            password: "strongPassword1@#",
          },
        },
      },
    },
    tags: [
      {
        name: "Users",
        description: "User register and login",
      },
    ],
  },
  apis: ["./swagger.js", "./src/routes/*.js"],
});

module.exports = swaggerSpec;
