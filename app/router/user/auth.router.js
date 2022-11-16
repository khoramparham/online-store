const router = require("express").Router();
const {
  UserAuthController,
} = require("./../../http/controller/user/auth/auth.controller");
/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: user authorization
 */
/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in user panel with phone number
 *          description: one time password login
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad Request
 *              401:
 *                  description: un authorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/get-otp", UserAuthController.getOTP);
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check otp code
 *          description: one time password check
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: otp code
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad Request
 *              401:
 *                  description: un authorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/check-otp", UserAuthController.checkOTP);
/**
 * @swagger
 *  /user/refreshToken:
 *      post:
 *          tags: [User-Authentication]
 *          summary: get refreshToken
 *          description: refreshToken
 *          parameters:
 *          -   name: refreshToken
 *              in: formData
 *              required: true
 *              type: string
 *              description: refresh token must be with out double quotation
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad Request
 *              401:
 *                  description: un authorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/newRefreshToken", UserAuthController.newRefreshToken);
module.exports = {
  userAuthRoutes: router,
};
