const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { PublicCategoryType } = require("./public.type");

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    children: { type: new GraphQLList(PublicCategoryType) },
  },
});
module.exports = {
  CategoryType,
};
