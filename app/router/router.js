const router = require("express").Router();
const { homeRoutes } = require("./api");

router.use("/", homeRoutes);
module.exports = { AllRoutes: router };
