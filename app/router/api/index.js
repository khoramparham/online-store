const homeController = require("../../http/controller/api/home.controller");

const router = require("express").Router();

router.get("/", homeController.home);
module.exports = {
  homeRoutes: router,
};
