const router = require("express").Router();
const { homeRoutes } = require("./api/index.router");
const { userAuthRoutes } = require("./user/auth.router");
const { AdminRoutes } = require("./admin/admin.router");
// redis config
const redisClient = require("../utils/init_redis");
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
router.use("/user", userAuthRoutes);
router.use("/admin", AdminRoutes);
module.exports = { AllRoutes: router };
