const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLScalarType,
} = require("graphql");

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    first_last: { type: GraphQLString },
  },
});
const AnyType = new GraphQLScalarType({
  name: "anyType",
  // parseValue: toObject,
  // serialize: toObject,
  // parseLiteral: parseLiteral,
});
const PublicCategoryType = new GraphQLObjectType({
  name: "PublicCategoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});
module.exports = { AuthorType, AnyType, PublicCategoryType };
