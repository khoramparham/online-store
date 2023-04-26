const createHttpError = require("http-errors");
const { UserModel } = require("../../../models/user.model");
const Controller = require("../controller");
const { StatusCodes } = require("http-status-codes");
const { deleteInvalidPropertyInObject } = require("../../../utils/function");
class UserController extends Controller {
  async searchUser(req, res, next) {
    try {
      const { search } = req.params;
      const users = await UserModel.find({ $text: { $search: search } });
      return res.status(StatusCodes.OK).json({
        users,
        statusCode: StatusCodes.OK,
        success: true,
        message: "کاربر یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const userID = req.user._id;
      await this.findUserByID(userID);
      const data = req.body;
      const BlackListFields = [mobile, otp, bills, discount, Roles, Courses];
      deleteInvalidPropertyInObject(data, BlackListFields);
      const user = await UserModel.findByIdAndUpdate(userID, { $set: data });
      return res.status(StatusCodes.OK).json({
        user,
        statusCode: StatusCodes.OK,
        success: true,
        message: "بروز رسانی پروفایل با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async findUserByID(userID) {
    const user = await UserModel.findById(userID);
    if (!user) throw createHttpError.NotFound("کاربر یافت نشد");
    return user;
  }
}
module.exports = { UserController: new UserController() };
