const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const {
  CategoriesResolver,
  CategoryChildResolver,
} = require("./queries/category.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const {
  CreateCommentForBlog,
  CreateCommentForCourse,
  CreateCommentForProduct,
} = require("./mutations/comment.resolver");
const { LikeBlog, LikeCourse, LikeProduct } = require("./mutations/like.resolver");
const {
  DisLikeBlog,
  DisLikeProduct,
  DisLikeCourse,
} = require("./mutations/disLike.resolver");
const {
  BookMarkBlog,
  BookMarkProduct,
  BookMarkCourse,
} = require("./mutations/bookmark.resolver");
const {
  getUserBookmarkedBlogs,
  getUserBookmarkedCourses,
  getUserBookmarkedProducts,
} = require("./queries/user-action.resolver");
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
    products: ProductResolver,
    categories: CategoriesResolver,
    childOfCategory: CategoryChildResolver,
    courses: CourseResolver,
    getUserBookmarkedBlogs,
    getUserBookmarkedCourses,
    getUserBookmarkedProducts,
  },
});
const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    CreateCommentForBlog,
    CreateCommentForCourse,
    CreateCommentForProduct,
    LikeProduct,
    LikeBlog,
    LikeCourse,
    DisLikeBlog,
    DisLikeProduct,
    DisLikeCourse,
    BookMarkBlog,
    BookMarkProduct,
    BookMarkCourse,
  },
});
const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
module.exports = { graphQLSchema };
