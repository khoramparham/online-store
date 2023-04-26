const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createError = require("http-errors");

function createRoute(req) {
  const date = new Date();
  const Year = date.getFullYear().toString();
  const Month = date.getMonth().toString();
  const Day = date.getDate().toString();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "blog",
    Year,
    Month,
    Day
  );
  req.body.fileUploadPath = path
    .join("uploads", "blogs", Year, Month, Day)
    .replace(/\\/g, "/");
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      const filePath = createRoute(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file?.originalname) {
      const ext = path.extname(file.originalname);
      const fileName = String(new Date().getTime() + ext);
      req.body.fileName = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimetype = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  if (mimetype.includes(ext)) {
    return cb(null, true);
  }
  return cb(createError.BadRequest("فرمت ارسال شده صحیح نمی باشد"));
}
function videoFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimetype = [".mp4", ".mpg", ".mov", ".mkv"];
  if (mimetype.includes(ext)) {
    return cb(null, true);
  }
  return cb(createError.BadRequest("فرمت ارسال شده صحیح نمی باشد"));
}
const maxSizeImg = 1 * 1000 * 1000;
const maxSizeVideo = 300 * 1000 * 1000;
const imageFile = multer({ storage, fileFilter, fileSize: maxSizeImg });
const videoFile = multer({ storage, videoFilter, fileSize: maxSizeVideo });
module.exports = { imageFile, videoFile };
