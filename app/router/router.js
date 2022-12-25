const router = require("express").Router();
const { homeRoutes } = require("./api/index.router");
const { UserRoutes } = require("./user/user.router");
const { AdminRoutes } = require("./admin/admin.router");
// redis config
const redisClient = require("../utils/init_redis");
const { verifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");
redisClient.set("key", "value", (err, reply) => {
  if (err) console.log(err.message);
  console.log(reply);
});
redisClient.get("key", (err, reply) => {
  if (err) console.log(err.message);
  console.log(reply);
});
// Routes
router.use("/", verifyAccessToken, checkRole("ADMIN"), homeRoutes);
router.use("/user", UserRoutes);
router.use("/admin", verifyAccessToken, checkRole("ADMIN"), AdminRoutes);
module.exports = { AllRoutes: router };
