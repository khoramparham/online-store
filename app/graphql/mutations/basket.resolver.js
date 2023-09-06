const { GraphQLString } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const { copyObject } = require("../../utils/function");
// Types
const { ResponseType } = require("../typeDefs/public.type");
// Models
const { UserModel } = require("../../models/user.model");
const AddProductToBasket = {
  type: ResponseType,
  args: { productID: GraphQLString },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    const product = await findProductInBasket(user._id, productID);
    if (product) {
      await UserModel.updateOne(
        { _id: user._id, "basket.products.productID": productID },
        {
          $inc: {
            "basket.products.$.count": 1,
          },
        }
      );
    } else {
      await UserModel.updateOne(
        { _id: user._id },
        {
          $push: {
            "basket.products": {
              productID,
              count: 1,
            },
          },
        }
      );
    }
    return {
      statusCode: HttpStatus.OK,
      data: {
        message: "محصول به سبد خرید افزوده شد",
      },
    };
  },
};
const AddCourseToBasket = {
  type: ResponseType,
  args: { courseID: GraphQLString },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { courseID } = args;
    await checkExistCourse(courseID);
    const course = await findCourseInBasket(user._id, courseID);
    if (course) {
      throw createHttpError.BadRequest("این دوره قبلا به سبد خرید اضافه شده");
    } else {
      await UserModel.updateOne(
        { _id: user._id },
        {
          $push: {
            "basket.courses": {
              courseID,
              count: 1,
            },
          },
        }
      );
    }
    return {
      statusCode: HttpStatus.OK,
      data: {
        message: "دوره به سبد خرید افزوده شد",
      },
    };
  },
};
const RemoveProductToBasket = {
  type: ResponseType,
  args: { productID: GraphQLString },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    const product = await findProductInBasket(user._id, productID);
    let message;
    if (!product) throw createHttpError.NotFound("محصول مورد نظر در سبد خرید یافت نشد");
    if (product.count > 1) {
      await UserModel.updateOne(
        {
          _id: user._id,
          "basket.products.productID": productID,
        },
        {
          $inc: {
            "basket.products.$.count": -1,
          },
        }
      );
      message = "یک عدد از محصول داخل سبد خرید کم شد";
    } else {
      await UserModel.updateOne(
        {
          _id: user._id,
          "basket.products.productID": productID,
        },
        {
          $pull: {
            "basket.products": {
              productID,
            },
          },
        }
      );
      message = "محصول در داخل سبد خرید حذف شد";
    }
    return {
      statusCode: HttpStatus.OK,
      data: {
        message,
      },
    };
  },
};
const RemoveCourseToBasket = {
  type: ResponseType,
  args: { courseID: GraphQLString },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { courseID } = args;
    await checkExistCourse(courseID);
    const userCourse = await UserModel.findOne({ _id: user._id, Courses: courseID });
    if (userCourse)
      throw new createHttpError.BadRequest("شما این دوره رو قبلا خریداری کردید");
    const course = await findCourseInBasket(user._id, courseID);
    if (!course)
      throw createHttpError.NotFound("دوره مورد نظزر در داخل سبد خرید یافت نشد");
    if (course.count > 1) {
      await UserModel.updateOne(
        {
          _id: user._id,
          "basket.courses.courseID": courseID,
        },
        {
          $inc: {
            "basket.courses.$.count": -1,
          },
        }
      );
      message = "یک عدد از دوره داخل سبد خرید کم شد";
    } else {
      await UserModel.updateOne(
        {
          _id: user._id,
          "basket.courses.courseID": courseID,
        },
        {
          $pull: {
            "basket.courses": {
              courseID,
            },
          },
        }
      );
      message = "دوره در داخل سبد خرید حذف شد";
    }
    return {
      statusCode: HttpStatus.OK,
      data: {
        message,
      },
    };
  },
};
async function findProductInBasket(userID, productID) {
  const findResult = await UserModel.findOne(
    { _id: userID, "basket.products.productID": productID },
    { "basket.products.$": 1 }
  );
  const userDetail = copyObject(findResult);
  return userDetail?.basket?.products?.[0];
}
async function findCourseInBasket(userID, courseID) {
  const findResult = await UserModel.findOne(
    { _id: userID, "basket.courses.courseID": courseID },
    { "basket.courses.$": 1 }
  );
  const userDetail = copyObject(findResult);
  return userDetail?.basket?.courses?.[0];
}
async function checkExistProduct(id) {
  const blog = await ProductModel.findById(id);
  if (!blog) throw createHttpError.NotFound("بلاگی با این مشخصات یافت نشد");
  return blog;
}
async function checkExistCourse(id) {
  const course = await CourseModel.findById(id);
  if (!course) throw createHttpError.NotFound("بلاگی با این مشخصات یافت نشد");
  return course;
}
module.exports = {
  AddCourseToBasket,
  AddProductToBasket,
  RemoveCourseToBasket,
  RemoveProductToBasket,
};
