const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const redisClient = require("./init_redis");
const { UserModel } = require("../models/user.model");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constants");
function createRandomNumberForOTP() {
  return Math.floor(Math.random() * 89999) + 10000;
}

async function signAccessToken(userID) {
  const user = await UserModel.findById(userID);
  const payLoad = {
    mobile: user.mobile,
  };
  const options = {
    expiresIn: "1h",
  };
  const token = JWT.sign(payLoad, ACCESS_TOKEN_SECRET_KEY, options);
  return token;
}

async function signRefreshToken(userID) {
  const user = await UserModel.findById(userID);
  const payLoad = {
    mobile: user.mobile,
  };
  const options = {
    expiresIn: "1y",
  };
  const token = JWT.sign(payLoad, REFRESH_TOKEN_SECRET_KEY, options);
  await redisClient.set(userID.toString(), token, { EX: 31536000 });
  return token;
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createError.Unauthorized("حساب کاربری یافت نشد"));
      const refreshToken = await redisClient.get(user._id.toString());
      if (token == refreshToken) return resolve(mobile);
      reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"));
    });
  });
}

function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
}
function setFeatures(body) {
  const { colors, width, weight, height, length } = body;
  let features = {};
  features.colors = colors;
  if (!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)) {
    if (!width) features.width = 0;
    else features.width = +width;
    if (!height) features.height = 0;
    else features.height = +height;
    if (!weight) features.weight = 0;
    else features.weight = +weight;
    if (!length) features.length = 0;
    else features.length = +length;
  }
  return features;
}
function ListOfImagesFromRequest(files, fileUploadPath) {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
}
module.exports = {
  createRandomNumberForOTP,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  deleteFileInPublic,
  setFeatures,
  ListOfImagesFromRequest,
};
