const { GraphQLString } = require("graphql");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
// Types
const { ResponseType } = require("../typeDefs/public.type");
// Models
const { BlogModel } = require("../../models/blog.model");
const { ProductModel } = require("../../models/product.model");
const { CourseModel } = require("../../models/course.model");
const createHttpError = require("http-errors");

const BookMarkProduct = {
  type: ResponseType,
  args: { productID: GraphQLString },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    let BookmarkedProduct = await ProductModel.findOne({
      _id: productID,
      bookmarks: user._id,
    });
    const updateQuery = BookmarkedProduct
      ? { $pull: { bookmarks: user._id } }
      : { $push: { bookmarks: user._id } };
    await ProductModel.updateOne({ _id: productID }, updateQuery);
    let message;
    if (!BookmarkedProduct) {
      message = "محصول به لیست علاقه مند های شما اضافه شد";
    } else {
      message = "محصول از لیست علاقه مندی های شما حذقف شد";
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          message,
        },
      };
    }
  },
};
const BookMarkCourse = {
  type: ResponseType,
  args: { courseID: GraphQLString },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { courseID } = args;
    await checkExistCourse(courseID);
    let bookMarkedCourse = await CourseModel.findOne({
      _id: courseID,
      bookmarks: user._id,
    });
    const updateQuery = bookMarkedCourse
      ? { $pull: { bookmarks: user._id } }
      : { $push: { bookmarks: user._id } };
    await CourseModel.updateOne({ _id: courseID }, updateQuery);
    let message;
    if (!bookMarkedCourse) {
      message = "دوره به لیست علاقه مندی های شما اضافه شد";
    } else message = "دوره از لیست علاقه مندی های شما حذف شد";
    return {
      statusCode: HttpStatus.OK,
      data: {
        message,
      },
    };
  },
};
const BookMarkBlog = {
  type: ResponseType,
  args: { blogID: GraphQLString },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { blogID } = args;
    await checkExistBlog(blogID);
    let bookMarkedBlog = await BlogModel.findOne({ _id: blogID, bookmarks: user._id });
    const updateQuery = bookMarkedBlog
      ? { $pull: { bookmarks: user._id } }
      : { $push: { bookmarks: user._id } };
    await BlogModel.updateOne({ _id: blogID }, updateQuery);
    let message;
    if (!bookMarkedBlog) {
      message = "مقاله به لیست علاقه مندی های شما اضافه شد";
    } else {
      message = "مقاله از لیست علاقه مندی های شما حذف شد";
      return {
        statusCode: HttpStatus.OK,
        data: {
          message,
        },
      };
    }
  },
};
async function checkExistProduct(id) {
  const blog = await ProductModel.findById(id);
  if (!blog) throw createHttpError.NotFound("بلاگی با این مشخصات یافت نشد");
  return blog;
}
async function checkExistBlog(id) {
  const blog = await BlogModel.findById(id);
  if (!blog) throw createHttpError.NotFound("بلاگی با این مشخصات یافت نشد");
  return blog;
}
async function checkExistCourse(id) {
  const course = await CourseModel.findById(id);
  if (!course) throw createHttpError.NotFound("بلاگی با این مشخصات یافت نشد");
  return course;
}
module.exports = { BookMarkBlog, BookMarkCourse, BookMarkProduct };
