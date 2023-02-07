const router = require("express").Router();
const { UserController } = require("../../http/controller/user/user.controller");

const { AuthRoutes } = require("./auth.router");

router.use("/auth", AuthRoutes);
router.get("/searchUser/:search", UserController.searchUser);
router.patch("/updateUser", UserController.updateUser);

module.exports = { UserRoutes: router };
