const Joi = require("@hapi/joi");
const getOTP= Joi.object({
    // email : Joi.string().lowercase().trim().email().required().error(new Error("ایمیل وارد شده صحیح نمی باشد")),
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده نادرست است")),
    // password : Joi.string().min(6).max(16).trim().required().error(new Error("پسورد وارد شده بین 6 تا 16 کاراکتر باشد")),
});
const checkOTP= Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده نادرست است")),
    code : Joi.string().length(5).required().error(new Error("رمز وارد شده صحیح نمی باشد"))
})
module.exports = {
    getOTP,
    checkOTP,
};