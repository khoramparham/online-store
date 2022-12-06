const Controller = require("../controller");
const createError = require("http-errors");
// VALIDATORS
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../../validator/admin/category.schema");
// MODELS
const { default: mongoose } = require("mongoose");
const { CategoryModel } = require("../../../models/category.model");

class CategoryController extends Controller {
  async createCategory(req, res, next) {
    try {
      await createCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category) throw createError.InternalServerError("خطا داخلی");
      return res.status(201).json({
        category: {
          _id: category._id,
          title: category.title,
          parent: category.parent,
        },
        status: 201,
        success: true,
        message: "دسته بندی با موفقیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getParent(req, res, next) {
    try {
      const parents = await CategoryModel.find({ parent: undefined });
      if (!parents) throw createError.NotFound("دسته بندی با موفقیت یافت نشد");
      return res.status(200).json({
        category: parents,
        status: 200,
        success: true,
        message: "دسته بندی با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryByID(req, res, next) {
    try {
      const categoryID = req.params.id;
      const category = await CategoryModel.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(categoryID),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
      ]);
      if (!category) throw createError.NotFound("دسته بندی  یافت نشد");
      return res.status(200).json({
        category,
        status: 200,
        success: true,
        message: "دسته بندی با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategoryV1(req, res, next) {
    try {
      const category = await CategoryModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
        {
          $match: {
            parent: undefined,
          },
        },
      ]);
      if (!category) throw createError.NotFound("دسته بندی  یافت نشد");
      return res.status(200).json({
        category,
        status: 200,
        success: true,
        message: "دسته بندی با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategoryV2(req, res, next) {
    try {
      const category = await CategoryModel.aggregate([
        {
          $graphLookup: {
            from: "categories",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parent",
            maxDepth: 5,
            depthField: "depth",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
        {
          $match: {
            parent: undefined,
          },
        },
      ]);
      if (!category) throw createError.NotFound("دسته بندی  یافت نشد");
      return res.status(200).json({
        category,
        status: 200,
        success: true,
        message: "دسته بندی با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategoryV3(req, res, next) {
    try {
      const category = await CategoryModel.find({});
      if (!category) throw createError.NotFound("دسته بندی  یافت نشد");
      return res.status(200).json({
        category: {
          category,
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
      await updateCategorySchema.validateAsync(req.body);
      const categoryID = req.params.id;
      const category = await CategoryModel.findOne({ categoryID });
      if (!category) throw createError.NotFound("دسته بندی  یافت نشد");
      const { title } = req.body;
      const updatedCategory = await CategoryModel.updateOne(
        { _id: categoryID },
        { $set: { title } }
      );
      if (updatedCategory.modifiedCount == 0)
        throw createError.InternalServerError("به روز رسانی انجام نشد");
      return res.status(200).json({
        status: 200,
        success: true,
        message: "دسته بندی با موفقیت به روز شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteByID(req, res, next) {
    try {
      const categoryID = req.params.id;
      const category = await CategoryModel.findByIdAndDelete({ _id: categoryID });
      if (!category) throw createError.NotFound("دسته بندی  یافت نشد");
      return res.status(200).json({
        category,
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
