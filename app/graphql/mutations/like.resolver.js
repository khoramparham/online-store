const { GraphQLString } = require("graphql");
const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
// Types
const { ResponseType } = require("../typeDefs/public.type");
// Models
const { CourseModel } = require("../../models/course.model");
const { BlogModel } = require("../../models/blog.model");
const { ProductModel } = require("../../models/product.model");

const LikeProduct = {
  type: ResponseType,
  args: { productID: GraphQLString },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    let likedProduct = await ProductModel.findOne({
      _id: productID,
      likes: user._id,
    });
    let disLikedProduct = await ProductModel.findOne({
      _id: productID,
      dislike: user._id,
    });
    const updateQuery = likedProduct
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };
    await ProductModel.updateOne({ _id: productID }, updateQuery);
    let message;
    if (!likedProduct) {
      if (disLikedProduct)
        await ProductModel.updateOne(
          { _id: productID },
          { $pull: { dislike: user._id } }
        );
      message = "پسندیدن محصول با موفقیت انجام شد";
    } else {
      message = "پسندیدن محصول لغو شد";
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          message,
        },
      };
    }
  },
};

const LikeBlog = {
  type: ResponseType,
  args: { blogID: GraphQLString },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { blogID } = args;
    await checkExistBlog(blogID);
    let likedBlog = await BlogModel.findOne({
      _id: blogID,
      likes: user._id,
    });
    let disLikedBlog = await BlogModel.findOne({
      _id: blogID,
      dislike: user._id,
    });
    const updateQuery = likedBlog
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };
    await BlogModel.updateOne({ _id: blogID }, updateQuery);
    let message;
    if (!likedBlog) {
      if (disLikedBlog)
        await BlogModel.updateOne({ _id: blogID }, { $pull: { dislike: user._id } });
      message = "پسندیدن مقاله با موفقیت انجام شد";
    } else {
      message = "پسندیدن مقاله لغو شد";
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          message,
        },
      };
    }
  },
};

const LikeCourse = {
  type: ResponseType,
  args: { courseID: GraphQLString },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { courseID } = args;
    await checkExistCourse(courseID);
    let likedCourse = await CourseModel.findOne({
      _id: courseID,
      likes: user._id,
    });
    let disLikedCourse = await CourseModel.findOne({
      _id: courseID,
      dislike: user._id,
    });
    const updateQuery = likedCourse
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };
    await CourseModel.updateOne({ _id: courseID }, updateQuery);
    let message;
    if (!likedCourse) {
      if (disLikedCourse)
        await CourseModel.updateOne({ _id: courseID }, { $pull: { dislike: user._id } });
      message = "پسندیدن دوره با موفقیت انجام شد";
    } else {
      message = "پسندیدن دوره لغو شد";
      return {
        statusCode: HttpStatus.CREATED,
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
module.exports = { LikeProduct, LikeCourse, LikeBlog };
