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
    const filePath = createRoute(req);
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = String(new Date().getTime() + ext);
    req.body.fileName = fileName;
    cb(null, fileName);
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
const maxSizeImg = 1 * 1000 * 1000;
const imageFile = multer({ storage, fileFilter, fileSize: maxSizeImg });
module.exports = { imageFile };
