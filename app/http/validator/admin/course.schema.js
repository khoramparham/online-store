const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constants");
const createCourseSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(30)
    .error(createError.BadRequest("عنوان محصول صحیح نمیباشد")),
  short_text: Joi.string()
    .required()
    .error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  text: Joi.string()
    .required()
    .error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(createError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
  category: Joi.string()
    .required()
    .regex(MongoIDPattern)
    .error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
  price: Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
  discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
  type: Joi.string()
    .required()
    .regex(/(free|cash|special)/i)
    .error(createError.BadRequest("تایپ وارد شده صحیح نمیباشد")),
  status: Joi.string()
    .regex(/(notStarted|Completed|Holding)/i)
    .error(createError.BadRequest("وضعیت وارد شده صحیح نمیباشد")),
  //   students: Joi.array()
  //     .regex(MongoIDPattern)
  //     .error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
  fileName: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  fileUploadPath: Joi.allow(),
});
const updateCourseSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createError.BadRequest("عنوان محصول صحیح نمیباشد")),
  short_text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(createError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
  category: Joi.string()
    .regex(MongoIDPattern)
    .error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
  price: Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
  discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
  type: Joi.string()
    .regex(/(free|cash|special)/i)
    .error(createError.BadRequest("تایپ وارد شده صحیح نمیباشد")),
  status: Joi.string()
    .regex(/(notStarted|Completed|Holding)/i)
    .error(createError.BadRequest("وضعیت وارد شده صحیح نمیباشد")),
  fileName: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  fileUploadPath: Joi.allow(),
});
module.exports = { createCourseSchema, updateCourseSchema };
