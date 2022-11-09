const { timeStamp } = require("console");
const express = require("express");
const { default: mongoose } = require("mongoose");
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
    const path = require("path");
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    // swagger config
    const swaggerJsdoc = require("swagger-jsdoc");
    const swaggerUI = require("swagger-ui-express");
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsdoc({
          swaggerDefinition: {
            info: {
              title: "Express API for online store ",
              version: "1.0.0",
              description: "This is a REST API application made with Express.",
            },
            contact: {
              name: "parham khoram",
              url: "https://www.linkedin.com/in/parhamkhoram",
            },
            servers: [
              {
                url: "http://localhost:3000",
              },
            ],
          },
          apis: ["./app/router/**/*.router.js"],
        })
      )
    );
    // morgen config
    const morgan = require("morgan");
    this.#app.use(morgan("dev"));
    // cors config
    const cors = require("cors");
    this.#app.use(cors())
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("Server run on http://localhost:" + this.#PORT);
    });
  }
  connectToMongoDB() {
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
  initRedis(){
    const redisClient = require("./utils/init_redis");
  }
  createRoutes() {
    const { AllRoutes } = require("./router/router");
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    const createError = require("http-errors");
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
