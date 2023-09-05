const createError = require("http-errors");
const { UserModel } = require("../../models/user.model");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constants");
const JWT = require("jsonwebtoken");

function getToken(headers) {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) return token;
  throw createError.Unauthorized("حساب کاربری شناسایی نشد وارد حساب کاربری خود شوید");
}

function verifyAccessToken(req, res, next) {
  try {
    const token = getToken(req.headers);
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      try {
        if (err) throw next(createError.Unauthorized("وارد حساب کاربری خود شوید"));
        const { mobile } = payload || {};
        const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
        if (!user) throw createError.Unauthorized("حساب کاربری یافت نشد");
        req.user = user;
        return next();
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
}
async function VerifyAccessTokenInGraphQL(req) {
  try {
    const token = getToken(req.headers);
    const { mobile } = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
    if (!user) throw new createError.Unauthorized("حساب کاربری یافت نشد");
    return user;
  } catch (error) {
    throw new createError.Unauthorized("وارد حساب کاربری خود شوید");
  }
}
module.exports = {
  verifyAccessToken,
  VerifyAccessTokenInGraphQL,
};
