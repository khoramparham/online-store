const { GraphQLList } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
// Models
const { BlogModel } = require("../../models/blog.model");
const { CourseModel } = require("../../models/course.model");
const { ProductModel } = require("../../models/product.model");
// Types
const { BlogType } = require("../typeDefs/blog.type");
const { CourseType } = require("../typeDefs/course.type");
const { ProductType } = require("../typeDefs/product.type");
const { AnyType } = require("../typeDefs/public.type");
const { copyObject } = require("../../utils/function");

const getUserBookmarkedBlogs = {
  type: new GraphQLList(BlogType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const blogs = await BlogModel.find({ bookmarks: user._id }).populate([
      { path: "author" },
      { path: "category" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
    return blogs;
  },
};
const getUserBookmarkedProducts = {
  type: new GraphQLList(ProductType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const products = await ProductModel.find({ bookmarks: user._id }).populate([
      { path: "supplier" },
      { path: "category" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
    return products;
  },
};
const getUserBookmarkedCourses = {
  type: new GraphQLList(CourseType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const courses = await CourseModel.find({ bookmarks: user._id }).populate([
      { path: "teacher" },
      { path: "category" },
      { path: "comments.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
    return courses;
  },
};
const getUserBasket = {
  type: AnyType,
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const userDetail = await getBasketOfUser(user._id);
    return userDetail;
  },
};
async function getBasketOfUser(userID, discount = {}) {
  const userDetail = await UserModel.aggregate([
    {
      $match: { _id: userID },
    },
    {
      $project: { basket: 1 },
    },
    {
      $lookup: {
        from: "products",
        localField: "basket.products.productID",
        foreignField: "_id",
        as: "productDetail",
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "basket.courses.courseID",
        foreignField: "_id",
        as: "courseDetail",
      },
    },
    {
      $addFields: {
        productDetail: {
          $function: {
            body: function (productDetail, products) {
              return productDetail.map(function (product) {
                const count = products.find(
                  (item) => item.productID.valueOf() == product._id.valueOf()
                ).count;
                const totalPrice = count * product.price;
                return {
                  ...product,
                  basketCount: count,
                  totalPrice,
                  finalPrice: totalPrice - (product.discount / 100) * totalPrice,
                };
              });
            },
            args: ["$productDetail", "$basket.products"],
            lang: "js",
          },
        },
        courseDetail: {
          $function: {
            body: function (courseDetail) {
              return courseDetail.map(function (course) {
                return {
                  ...course,
                  finalPrice: course.price - (course.discount / 100) * course.price,
                };
              });
            },
            args: ["$courseDetail"],
            lang: "js",
          },
        },
        payDetail: {
          $function: {
            body: function (courseDetail, productDetail, products) {
              const courseAmount = courseDetail.reduce(function (total, course) {
                return total + (course.price - (course.discount / 100) * course.price);
              }, 0);
              const productAmount = productDetail.reduce(function (total, product) {
                const count = products.find(
                  (item) => item.productID.valueOf() == product._id.valueOf()
                ).count;
                const totalPrice = count * product.price;
                return total + (totalPrice - (product.discount / 100) * totalPrice);
              }, 0);
              const courseIds = courseDetail.map((course) => course._id.valueOf());
              const productIds = productDetail.map((product) => product._id.valueOf());
              return {
                courseAmount,
                productAmount,
                paymentAmount: courseAmount + productAmount,
                courseIds,
                productIds,
              };
            },
            args: ["$courseDetail", "$productDetail", "$basket.products"],
            lang: "js",
          },
        },
      },
    },
    {
      $project: {
        basket: 0,
      },
    },
  ]);
  return copyObject(userDetail);
}
module.exports = {
  getUserBookmarkedBlogs,
  getUserBookmarkedCourses,
  getUserBookmarkedProducts,
  getUserBasket,
};
