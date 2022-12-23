const createError = require("http-errors");
const { UserModel } = require("../../models/user.model");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constants");
const JWT = require("jsonwebtoken");

function verifyAccessToken(req, res, next) {
  try {
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    if (token && ["Bearer", "bearer"].includes(bearer)) {
      JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
        console.log(err);
        if (err) return next(createError.Unauthorized("وارد حساب کاربری خود شوید"));
        const { mobile } = payload || {};
        const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
        if (!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"));
        req.user = user;
        return next();
      });
    }
  } catch (error) {
    return next(createError.Unauthorized("مجددا وارد حساب کاربری خود شوید"));
  }
}

module.exports = {
  verifyAccessToken,
};
