const Joi = require("@hapi/joi");

const createCategory = Joi.object({
  title: Joi.string().required().error(new Error("نام دسته بندی را درست وارد کنید")),
  slug: Joi.string().error(new Error("نام دسته را به حروف وارد کنید")),
});

module.exports = {
  createCategory,
};
