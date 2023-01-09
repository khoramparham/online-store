const router = require("express").Router();
const {
  UserAuthController,
} = require("./../../http/controller/user/auth/auth.controller");
router.post("/get-otp", UserAuthController.getOTP);
router.post("/check-otp", UserAuthController.checkOTP);
router.post("/newRefreshToken", UserAuthController.newRefreshToken);
module.exports = { AuthRoutes: router };
