const router = require("express").Router();
const { homeRoutes } = require("./api");
const { userAuthRoutes } = require("./user/auth.router");

router.use("/", homeRoutes);
router.use("/user" , userAuthRoutes)
module.exports = { AllRoutes: router };
