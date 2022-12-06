const router = require("express").Router();
const { CategoryRoutes } = require("./category.router");

router.use("/category", CategoryRoutes);

module.exports = { AdminRoutes: router };
