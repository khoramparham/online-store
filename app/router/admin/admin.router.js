const router = require("express").Router();
const { CategoryRoutes } = require("./category.router");
const { BlogRoutes } = require("./Blog.router");
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
router.use("/category", CategoryRoutes);
router.use("/blog", verifyAccessToken, BlogRoutes);
module.exports = { AdminRoutes: router };
