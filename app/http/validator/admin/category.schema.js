const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constants");

const createCategorySchema = Joi.object({
  title: Joi.string().required().error(new Error("نام دسته بندی را درست وارد کنید")),
  parent: Joi.string()
    .allow(" ")
    .pattern(MongoIDPattern)
    .allow(" ")
    .error(new Error("شناسه ارسال شده صحیح نمی باشد")),
});

const updateCategorySchema = Joi.object({
  title: Joi.string().required().error(new Error("نام دسته بندی را درست وارد کنید")),
});
module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
