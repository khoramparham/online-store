const router = require("express").Router();
const { AuthRoutes } = require("./auth.router");

router.use("/auth", AuthRoutes);
module.exports = { UserRoutes: router };
