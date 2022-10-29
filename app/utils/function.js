const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { SECRET_KEY, ACCESS_TOKEN_SECRET_KEY } = require("./constants");
function createRandomNumberForOTP() {
  return Math.floor(Math.random() * 89999) + 10000;
}

async function signAccessToken(userID) {
  try {
    const user = await UserModel.findById(userID);
    const payLoad = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1h",
    };
    const token = JWT.sign(payLoad, SECRET_KEY, options);
    return token;
  } catch (error) {
    next(error);
  }
}


module.exports = {
  createRandomNumberForOTP,
  signAccessToken,
};
