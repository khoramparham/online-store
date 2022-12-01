const Controller = require("../controller");
const createError = require("http-errors");
// VALIDATORS
const { createCategory } = require("../../validator/admin/category.schema");
// MODELS

const { CategoryModel } = require("../../../models/category.model");
class CategoryController extends Controller {
  async createCategory(req, res, next) {
    try {
      await createCategory.validateAsync(req.body);
      const { title, slug } = req.body;
      const category = await CategoryModel.create({ title, slug });
      return res.status(201).json({
        category: {
          _id: category._id,
          title: category.title,
          slug: category.slug,
        },
        status: 201,
        success: true,
        message: "دسته بندی با موفقیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryByID(req, res, next) {
    try {
      const categoryID = req.params.id;
      const category = await CategoryModel.findById({ _id: categoryID });
      if (!category) throw createError.NotFound("دسته بندی  یافت نشد");
      return res.status(200).json({
        category: {
          _id: category._id,
          title: category.title,
          slug: category.slug,
        },
        status: 200,
        success: true,
        message: "دسته بندی با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryBySlug(req, res, next) {
    try {
      const slugName = req.params.slug;
      const category = await CategoryModel.findOne({ slug: slugName });
      if (!category) throw createError.NotFound("دسته بندی  یافت نشد");
      return res.status(200).json({
        category: {
          _id: category._id,
          title: category.title,
          slug: category.slug,
        },
        status: 200,
        success: true,
        message: "دسته بندی با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateCategory(req, res, next) {
    try {
      await createCategory.validateAsync(req.body);
      const { categoryID, title, slug } = req.body;
      // const categoryFind = await CategoryModel.findById({ categoryID });
      const category = await CategoryModel.findByIdAndUpdate({ _id }, { title, slug });
      if (!!categoryFind) throw createError.NotFound("دسته بندی یافت نشد");
      return res.status(201).json({
        category: {
          _id: category._id,
          title: category.title,
          slug: category.slug,
        },
        status: 201,
        success: true,
        message: "دسته بندی با موفقیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCategoryByID(req, res, next) {
    try {
      const categoryID = req.params.id;
      const category = await CategoryModel.findByIdAndDelete({ _id: categoryID });
      if (!category) throw createError.NotFound("دسته بندی  یافت نشد");
      return res.status(200).json({
        category: {
          _id: category._id,
          title: category.title,
          slug: category.slug,
        },
        status: 200,
        success: true,
        message: "دسته بندی با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  CategoryController: new CategoryController(),
};
