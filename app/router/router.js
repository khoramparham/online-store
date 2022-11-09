const router = require("express").Router();
const redisClient = require("../utils/init_redis");
const { homeRoutes } = require("./api");
const { userAuthRoutes } = require("./user/auth.router");
redisClient.set("key", "value", (err, reply) => {
  if (err) console.log(err.message);
  console.log(reply);
});
redisClient.get("key", (err, reply) => {
  if (err) console.log(err.message);
  console.log(reply);
});
router.use("/", homeRoutes);
router.use("/user", userAuthRoutes);
module.exports = { AllRoutes: router };
