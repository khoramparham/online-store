const createError = require("http-errors");
const Controller = require("./../../controller");
// FUNCTIONS
const {
  createRandomNumberForOTP,
  signAccessToken,
} = require("../../../../utils/function");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constants");
// VALIDATORS
const { getOTP, checkOTP } = require("../../../validator/user/auth.schema");
// MODELS
const { UserModel } = require("../../../../models/user.model");

class UserAuthController extends Controller {
  async getOTP(req, res, next) {
    try {
      await getOTP.validateAsync(req.body);
      const { mobile } = req.body;
      const code = createRandomNumberForOTP();
      const result = await this.saveUser(mobile, code);
      if (!result) throw createError.Unauthorized("ورود شما انجام نشد");
      return res.status(200).json({
        mobile,
        code,
        status: 200,
        success: true,
        message: "ورود شما با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
      await checkOTP.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });
      if (!user) throw createError.NotFound("کاربر یافت نشد");
      const now = Date.now();
      if (+user.otp.expiresIn < now)
        throw createError.Unauthorized("کد شما منقضی شده");
      if (user.otp.code != code)
        throw createError.Unauthorized("کد ارسال شده صحیح نمی باشد");
      const accessToken = await signAccessToken(user._id);
      return res.json({
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async saveUser(mobile, code) {
    const now = new Date().getTime();
    let otp = {
      code,
      expiresIn: EXPIRES_IN,
    };
    const userExist = await this.checkExistUser(mobile);
    if (userExist) {
      const user = await UserModel.findOne({ mobile });
      if (+user.otp.expiresIn > now)
        throw createError.Forbidden("کد اعتبار سنجی قبلی هنوز منقضی نشده است");
      return await this.updateUser(mobile, { otp });
    }
    return await UserModel.create({
      mobile,
      otp,
      Role: USER_ROLE,
    });
  }

  async checkExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }

  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
