const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constants");
const createError = require("http-errors");

const createEpisode = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(30)
    .error(createError.BadRequest("عنوان فصل صحیح نمیباشد")),
  text: Joi.string()
    .required()
    .error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  type: Joi.string()
    .required()
    .regex(/(unlock|lock)/i)
    .error(createError.BadRequest("تایپ وارد شده صحیح نمیباشد")),
  chapterID: Joi.string()
    .regex(MongoIDPattern)
    .error(createError.BadRequest("شناسه ی فصل صحیح نمیباشد")),
  courseID: Joi.string()
    .regex(MongoIDPattern)
    .error(createError.BadRequest("شناسه ی دوره صحیح نمیباشد")),
  filename: Joi.string()
    .regex(/(\.mp4|\.mov|\.mkv|\.mpg)$/)
    .error(createError.BadRequest("ویدیو ارسال شده صحیح نمیباشد")),
  fileUploadPath: Joi.allow(),
});

module.exports = { createEpisode };
