const router = require("express").Router();
const { UserAuthController } = require("./../../http/controller/user/auth/auth.controller");

router.post("/login",UserAuthController.login)
module.exports ={
    userAuthRoutes : router
}