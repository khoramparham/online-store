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
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    const path = require("path");
    const swaggerUI = require("swagger-ui-express");
    const swaggerJsdoc = require("swagger-jsdoc");
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
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
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("Server run on http://localhost:" + this.#PORT);
    });
  }
  connectToMongoDB() {
    mongoose.connect(this.#DB_URI, (error) => {
      if (!error) return console.log("connect to mongoDB on " + this.#DB_URI);
      return console.log("failed to connect");
    });
  }
  createRoutes() {
    const { AllRoutes } = require("./router/router");
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        statusCode: 404,
        message: "آدرس مورد نظر یافت نشد",
      });
    });
    this.#app.use((error, req, res, next) => {
      const statusCode = error.status || 500;
      const message = error.message || "Internal Server Error";
      return res.status(statusCode).json({
        statusCode,
        message,
      });
    });
  }
};
