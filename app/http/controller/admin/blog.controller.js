const {
  createBlogSchema,
  updateBlogSchema,
} = require("../../validator/admin/blog.schema");
const mongoose = require("mongoose");
const Controller = require("../controller");
const path = require("path");
const { BlogModel } = require("../../../models/blog.model");
const createError = require("http-errors");
const { deleteFileInPublic } = require("../../../utils/function");

class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await createBlogSchema.validateAsync(req.body);
      req.body.image = path
        .join(blogDataBody.fileUploadPath, blogDataBody.fileName)
        .replace(/\\/g, "/");
      const { title, text, short_text, category, tags } = blogDataBody;
      const image = req.body.image;
      const author = req.user._id;
      const blog = await BlogModel.create({
        title,
        image,
        text,
        short_text,
        category,
        tags,
        author,
      });
      return res.status(201).json({
        blog,
        status: 201,
        success: true,
        message: "ایجاد بلاگ با موفقیت انجام شد",
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getBlogByIDv1(req, res, next) {
    try {
      const blogID = mongoose.Types.ObjectId(req.params.id);
      await this.findBlog(blogID);
      const blog = await BlogModel.aggregate([
        { $match: { _id: blogID } },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $project: {
            "author.__v": 0,
            "category.__v": 0,
            "author.otp": 0,
            "author.Roles": 0,
            "author.discount": 0,
            "author.bills": 0,
          },
        },
      ]);
      return res.status(200).json({
        blog,
        status: 200,
        success: true,
        message: "بلاگ با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getBlogByIDv2(req, res, next) {
    try {
      const blogID = req.params.id;
      await this.findBlog(blogID);
      const blog = await BlogModel.findById(blogID).populate([
        { path: "category", select: ["title"] },
        { path: "author", select: ["mobile", "first_name", "last_name", "username"] },
      ]);
      delete blog.category.children;
      return res.status(200).json({
        blog,
        status: 200,
        success: true,
        message: "بلاگ با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllBlog(req, res, next) {
    try {
      const blog = await BlogModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $project: {
            "author.__v": 0,
            "category.__v": 0,
            "author.otp": 0,
            "author.Roles": 0,
            "author.discount": 0,
            "author.bills": 0,
          },
        },
      ]);
      return res.status(200).json({
        blog,
        status: 200,
        success: true,
        message: "بلاگ با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBlog(req, res, next) {
    try {
      const blogID = req.params.id;
      await this.findBlog(blogID);
      const data = await updateBlogSchema.validateAsync(req.body);
      if (data?.fileUploadPath && data?.fileName) {
        req.body.image = path
          .join(data.fileUploadPath, data.fileName)
          .replace(/\\/g, "/");
      }
      let nullishData = ["", " ", "0", 0, null, undefined];
      let blackListFields = ["bookmarks", "dislikes", "comments", "likes", "author"];
      Object.keys(data).forEach((key) => {
        if (blackListFields.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0)
          data[key] = data[key].map((item) => item.trim());
        if (nullishData.includes(data[key])) delete data[key];
      });
      const blog = await BlogModel.findByIdAndUpdate(blogID, { $set: data });
      if (blog.modifiedCount == 0)
        throw createError.InternalServerError("به روز رسانی انجام نشد");
      return res.status(200).json({
        blog,
        status: 200,
        success: true,
        message: "ایجاد بلاگ با موفقیت به روز شد",
      });
    } catch (error) {
      deleteFileInPublic(req?.body?.image);
      next(error);
    }
  }
  async deleteBlogByID(req, res, next) {
    try {
      const blogID = req.params.id;
      await this.findBlog(blogID);
      const blog = await BlogModel.findByIdAndDelete(blogID);
      if (blog.deletedCount == 0) throw createError.InternalServerError("حذف انجام نشد");
      return res.status(200).json({
        blog,
        status: 200,
        success: true,
        message: "بلاگ با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async findBlog(ID) {
    const blog = await BlogModel.findById(ID);
    if (!blog) {
      throw createError.NotFound("بلاگ مورد نظر یافت نشد");
    }
    return blog;
  }
}
module.exports = {
  AdminBlogController: new BlogController(),
};
