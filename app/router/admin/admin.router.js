const router = require("express").Router();
// routes
const { CategoryRoutes } = require("./category.router");
const { BlogRoutes } = require("./Blog.router");
const { ProductRoutes } = require("./product.router");
// middleWares
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
router.use("/category", CategoryRoutes);
router.use("/blog", verifyAccessToken, BlogRoutes);
router.use("/product", ProductRoutes);
module.exports = { AdminRoutes: router };
