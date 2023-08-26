const router = require("express").Router();
const { homeRoutes } = require("./api/index.router");
const { UserRoutes } = require("./user/user.router");
const { AdminRoutes } = require("./admin/admin.router");
const { graphQLSchema } = require("./../graphql/index.graphQL");
// redis config
const redisClient = require("../utils/init_redis");
const { verifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");
const { graphqlHTTP } = require("express-graphql");
redisClient.set("key", "value", (err, reply) => {
  if (err) console.log(err.message);
  console.log(reply);
});
redisClient.get("key", (err, reply) => {
  if (err) console.log(err.message);
  console.log(reply);
});
// Routes
router.use("/", homeRoutes);
router.use("/user", UserRoutes);
router.use("/admin", AdminRoutes);
router.use(
  "/graphql",
  graphqlHTTP(function (req, res) {
    return { schema: graphQLSchema, graphiql: true, context: { req, res } };
  })
);
module.exports = { AllRoutes: router };
