const Controller = require("../controller");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
// Models
const { ProductModel } = require("../../../models/product.model");
// validators
const { createProductSchema } = require("../../validator/admin/product.schema");
const { idValidator } = require("../../validator/public.schema");
// functions
const {
  deleteFileInPublic,
  setFeatures,
  ListOfImagesFromRequest,
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../utils/function");
const ProductBlackList = {
  BOOKMARKS: "bookmarks",
  LIKES: "likes",
  DISLIKES: "dislikes",
  COMMENTS: "comments",
  SUPPLIER: "supplier",
  WEIGHT: "weight",
  WIDTH: "width",
  LENGTH: "length",
  HEIGHT: "height",
  COLORS: "colors",
};
Object.freeze(ProductBlackList);

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
      return res.status(StatusCodes.CREATED).json({
        product,
        success: true,
        statusCode: StatusCodes.CREATED,
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
      return res.status(StatusCodes.OK).json({
        product,
        success: true,
        statusCode: StatusCodes.OK,
        message: "محصول با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async searchProduct(req, res, next) {
    try {
      const search = req?.query?.search || "";
      const product = await ProductModel.find({ $text: { $search: search } });
      if (!product) throw createError.NotFound("محصول یافت نشد");
      return res.status(StatusCodes.OK).json({
        product,
        success: true,
        statusCode: StatusCodes.OK,
        message: "محصول با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getProductByID(req, res, next) {
    try {
      const productID = req.params.id;
      const product = await this.findProductByID(productID);
      return res.status(StatusCodes.OK).json({
        product,
        success: true,
        statusCode: StatusCodes.OK,
        message: "محصول با موفقیت یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req, res, next) {
    try {
      const productID = req.params.id;
      const product = await this.findProductByID(productID);
      const data = copyObject(req.body);
      data.images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
      data.features = setFeatures(req.body);
      let blackListFields = Object.values(ProductBlackList);
      deleteInvalidPropertyInObject(data, blackListFields);
      const updateProductResult = await ProductModel.updateOne(
        { _id: product._id },
        { $set: data }
      );
      if (updateProductResult.modifiedCount == 0)
        throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: "خطای داخلی" };
      res.status(StatusCodes.OK).json({
        success: true,
        statusCode: StatusCodes.OK,
        message: "محصول با موفقیت بروز شد",
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
      return res.status(StatusCodes.OK).json({
        product,
        success: true,
        statusCode: StatusCodes.OK,
        message: "محصول با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async findProductByID(productID) {
    const { id } = await idValidator.validateAsync({ id: productID });
    const product = await ProductModel.findById(id);
    if (!product) throw createError.NotFound("محصول یافت نشد");
    return product;
  }
}
module.exports = {
  ProductController: new ProductController(),
};
