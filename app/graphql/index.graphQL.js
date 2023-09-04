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

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
    products: ProductResolver,
    categories: CategoriesResolver,
    childOfCategory: CategoryChildResolver,
    courses: CourseResolver,
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
  },
});
const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
module.exports = { graphQLSchema };
