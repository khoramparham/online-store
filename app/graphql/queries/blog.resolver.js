const { GraphQLList, GraphQLString } = require("graphql");
const { BlogModel } = require("../../models/blog.model");
const { BlogType } = require("../typeDefs/blog.type");
const blogModel = require("../../models/blog.model");

const BlogResolver = {
  type: new GraphQLList(BlogType),
  resolve: async () => {
    return await BlogModel.find({}).populate("author");
  },
};
module.exports = {
  BlogResolver,
};
