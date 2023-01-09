const { AdminBlogController } = require("../../http/controller/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { imageFile } = require("../../utils/multer");
const router = require("express").Router();

router.post(
  "/createBlog",
  imageFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.createBlog
);
router.get("/getBlogByIDv1/:id", AdminBlogController.getBlogByIDv1);
router.get("/getBlogByIDv2/:id", AdminBlogController.getBlogByIDv2);
router.get("/getAllBlog", AdminBlogController.getAllBlog);
router.patch(
  "/updateBlog/:id",
  imageFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.updateBlog
);
router.delete("/deleteBlogByID/:id", AdminBlogController.deleteBlogByID);
module.exports = { BlogRoutes: router };
