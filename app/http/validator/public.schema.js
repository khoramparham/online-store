const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../utils/constants");
const createError = require("http-errors");
const idValidator = Joi.object({
  id: Joi.string()
    .pattern(MongoIDPattern)
    .error(new Error(createError.BadRequest("ای دی  را درست وارد کنید"))),
});
module.exports = { idValidator };
