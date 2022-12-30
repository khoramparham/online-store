const Controller = require("../controller");
const createError = require("http-errors");
// Models
const { ProductModel } = require("../../../models/product.model");
// validators
const { createProductSchema } = require("../../validator/admin/product.schema");
// functions
const {
  deleteFileInPublic,
  setFeatures,
  ListOfImagesFromRequest,
} = require("../../../utils/function");

class ProductController extends Controller {
  async createProduct(req, res, next) {
    try {
      const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
      const productBody = await createProductSchema.validateAsync(req.body);
      const { title, text, short_text, category, tags, count, price, discount, type } =
        productBody;
      const supplier = req.user._id;
      let features = setFeatures(req.body);
      const product = await ProductModel.create({
        title,
        text,
        short_text,
        category,
        tags,
        count,
        price,
        discount,
        images,
        features,
        supplier,
        type,
      });
      return res.status(201).json({
        product,
        success: true,
        statusCode: 200,
        message: "محصول با موفقیت ایجاد شد",
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getAllProduct(req, res, next) {
    try {
      const product = await ProductModel.find({});
      return res.status(200).json({
        product,
        success: true,
        statusCode: 200,
        message: "محصول با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getProductByID(req, res, next) {
    try {
      const productID = req.params.id;
      const product = await ProductModel.findById(productID);
      if (!product) throw createError.NotFound("محصول یافت نشد");
      return res.status(200).json({
        product,
        success: true,
        statusCode: 200,
        message: "محصول با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req, res, next) {
    try {
      const productID = req.params.id;
      const {} = req.body;
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const productID = req.params.id;
      const product = await ProductModel.findByIdAndDelete(productID);
      if (!product) throw createError.NotFound("محصول یافت نشد");
      if (product.deletedCount == 0)
        throw createError.InternalServerError("حذف انجام نشد");
      return res.status(200).json({
        product,
        success: true,
        statusCode: 200,
        message: "محصول با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  ProductController: new ProductController(),
};
