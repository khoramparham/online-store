const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const redisClient = require("./init_redis");
const { UserModel } = require("../models/user.model");
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
  const token = JWT.sign(payLoad, process.env.ACCESS_TOKEN_SECRET_KEY, options);
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
  const token = JWT.sign(payLoad, process.env.REFRESH_TOKEN_SECRET_KEY, options);
  await redisClient.set(userID.toString(), token, { EX: 31536000 });
  return token;
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
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
function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}
function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
  let nullishData = ["", " ", "0", 0, null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0)
      data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
}
function imageRequest(fileUploadPath, filename) {
  return path.join(fileUploadPath, filename).replace(/\\/g, "/");
}
function getTime(seconds) {
  let total = Math.round(seconds) / 60;
  let [minutes, percent] = String(total).split(".");
  let second = Math.round((percent * 60) / 100)
    .toString()
    .substring(0, 2);
  let hours = 0;
  if (minutes > 60) {
    total = minutes / 60;
    let [h1, percent] = String(total).split(".");
    (hours = h1),
      (minutes = Math.round((percent * 60) / 100)
        .toString()
        .substring(0, 2));
  }
  if (String(hours).length == 1) hours = `0${hours}`;
  if (String(minutes).length == 1) minutes = `0${minutes}`;
  if (String(second).length == 1) second = `0${second}`;

  return hours + ":" + minutes + ":" + second;
}
function getTimeOfCourse(chapters = []) {
  let time,
    hour,
    minute,
    second = 0;
  for (const chapter of chapters) {
    if (Array.isArray(chapter?.episodes)) {
      for (const episode of chapter.episodes) {
        if (episode?.time) time = episode.time.split(":"); // [hour, min, second]
        else time = "00:00:00".split(":");
        if (time.length == 3) {
          second += Number(time[0]) * 3600; // convert hour to second
          second += Number(time[1]) * 60; // convert minute to second
          second += Number(time[2]); //sum second with second
        } else if (time.length == 2) {
          second += Number(time[0]) * 60; // convert minute to second
          second += Number(time[1]); //sum second with second
        }
      }
    }
  }
  hour = Math.floor(second / 3600); //convert second to hour
  minute = Math.floor(second / 60) % 60; //convert second to minutes
  second = Math.floor(second % 60); //convert seconds to second
  if (String(hour).length == 1) hour = `0${hour}`;
  if (String(minute).length == 1) minute = `0${minute}`;
  if (String(second).length == 1) second = `0${second}`;
  return hour + ":" + minute + ":" + second;
}
module.exports = {
  createRandomNumberForOTP,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  deleteFileInPublic,
  setFeatures,
  ListOfImagesFromRequest,
  copyObject,
  deleteInvalidPropertyInObject,
  imageRequest,
  getTime,
  getTimeOfCourse,
};
