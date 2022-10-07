const Joi = require("@hapi/joi");
const authSchema= Joi.object({
    email : Joi.string().lowercase().trim().email().required().error(new Error("ایمیل وارد شده صحیح نمی باشد")),
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده نادرست است")),
    password : Joi.string().min(6).max(16).trim().required().error(new Error("پسورد وارد شده بین 6 تا 16 کاراکتر باشد")),
});
 
module.exports = {
    authSchema
};