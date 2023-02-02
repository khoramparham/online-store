const router = require("express").Router();
// routes
const { CategoryRoutes } = require("./category.router");
const { BlogRoutes } = require("./Blog.router");
const { ProductRoutes } = require("./product.router");
const { CourseRoutes } = require("./course.router");
const { ChapterRoutes } = require("./chapter.router");
const { EpisodeRoutes } = require("./episode.router");
// middleWares
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

router.use("/category", CategoryRoutes);
router.use("/blog", verifyAccessToken, BlogRoutes);
router.use("/product", ProductRoutes);
router.use("/course", verifyAccessToken, CourseRoutes);
router.use("/chapter", ChapterRoutes);
router.use("episode", EpisodeRoutes);
module.exports = { AdminRoutes: router };
