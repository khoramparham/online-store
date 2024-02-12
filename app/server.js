const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const createError = require("http-errors");
module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#DB_URI = DB_URI;
    this.#PORT = PORT;
    this.configApplication();
    this.connectToMongoDB();
    this.createServer();
    this.initRedis();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    // app config
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    // swagger config
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsdoc({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "Express API for online store ",
              version: "1.0.0",
              description: "This is a REST API application made with Express.",
              contact: {
                name: "parham khoram",
                url: "https://www.linkedin.com/in/khoramparham",
                email: "khoramparham@gmail.com",
              },
            },
            servers: [
              {
                url: "http://localhost:5000",
              },
              {
                url: "http://nodejs-online.liara.run",
              },
            ],
            components: {
              securitySchemes: {
                BearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
            },
            security: [{ BearerAuth: [] }],
          },
          apis: ["./app/router/**/*.swagger.js"],
        }),
        { explorer: true }
      )
    );
    // morgen config
    this.#app.use(morgan("dev"));
    // cors config
    this.#app.use(cors());
  }
  createServer() {
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("Server run on http://localhost:" + this.#PORT);
    });
  }
  connectToMongoDB() {
    mongoose.set("strictQuery", false);
    // mongoose connection
    mongoose.connect(this.#DB_URI, (error) => {
      if (!error) return console.log("connect to mongoDB on " + this.#DB_URI);
      return console.log(`failed to connect reason : ${error.message}`);
    });
    // mongoose event
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to mongodb");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("mongoose connection is disconnected");
    });
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("mongoose disconnected");
      process.exit(0);
    });
  }
  initRedis() {
    require("./utils/init_redis");
  }
  createRoutes() {
    const { AllRoutes } = require("./router/router");
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر یافت نشد"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        // data: {},
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
