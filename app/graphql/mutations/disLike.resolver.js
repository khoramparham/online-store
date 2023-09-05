const { GraphQLString } = require("graphql");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
// Models
const { BlogModel } = require("../../models/blog.model");
const { ProductModel } = require("../../models/product.model");
const { CourseModel } = require("../../models/course.model");
// Types
const { ResponseType } = require("../typeDefs/public.type");

const DisLikeProduct = {
  type: ResponseType,
  args: {
    productID: { type: GraphQLString },
  },
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
      dislikes: user._id,
    });
    const updateQuery = disLikedProduct
      ? { $pull: { dislikes: user._id } }
      : { $push: { dislikes: user._id } };
    await ProductModel.updateOne({ _id: productID }, updateQuery);
    let message;
    if (!disLikedProduct) {
      if (likedProduct)
        await ProductModel.updateOne({ _id: productID }, { $pull: { likes: user._id } });
      message = "نپسندیدن محصول با موفقیت انجام شد";
    } else {
      message = "نپسندیدن محصول لغو شد";
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          message,
        },
      };
    }
  },
};
const DisLikeCourse = {
  type: ResponseType,
  args: {
    courseID: { type: GraphQLString },
  },
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
      dislikes: user._id,
    });
    const updateQuery = disLikedCourse
      ? { $pull: { dislikes: user._id } }
      : { $push: { dislikes: user._id } };
    await CourseModel.updateOne({ _id: courseID }, updateQuery);
    let message;
    if (!disLikedCourse) {
      if (likedCourse)
        await CourseModel.updateOne({ _id: courseID }, { $pull: { likes: user._id } });
      message = "نپسندیدن دوره با موفقیت انجام شد";
    } else {
      message = "نپسندیدن دوره لغو شد";
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          message,
        },
      };
    }
  },
};
const DisLikeBlog = {
  type: ResponseType,
  args: {
    blogID: { type: GraphQLString },
  },
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
      dislikes: user._id,
    });
    const updateQuery = disLikedBlog
      ? { $pull: { dislikes: user._id } }
      : { $push: { dislikes: user._id } };
    await BlogModel.updateOne({ _id: blogID }, updateQuery);
    let message;
    if (!disLikedBlog) {
      if (likedBlog)
        await BlogModel.updateOne({ _id: blogID }, { $pull: { likes: user._id } });
      message = "نپسندیدن مقاله با موفقیت انجام شد";
    } else {
      message = "نپسندیدن مقاله لغو شد";
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
module.exports = {
  DisLikeProduct,
  DisLikeBlog,
  DisLikeCourse,
};
