const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AuthorType, PublicCategoryType } = require("./public.type");

const BlogType = new GraphQLObjectType({
  name: "BlogType",
  fields: {
    _id: { type: GraphQLString },
    author: { type: new GraphQLList(AuthorType) },
    title: { type: GraphQLString },
    short_text: { type: GraphQLString },
    text: { type: GraphQLString },
    image: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: new GraphQLList(PublicCategoryType) },
    // comments: { type:  new GraphQLList(GraphQLString)},
    // likes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    // dislikes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    // bookmarks: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
  },
});

module.exports = {
  BlogType,
};
