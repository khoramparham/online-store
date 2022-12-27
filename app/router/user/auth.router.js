const router = require("express").Router();
const {
  UserAuthController,
} = require("./../../http/controller/user/auth/auth.controller");
/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: reviced code from getOTP
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: enter refresh-token for get fresh token and refresh-token
 */
/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: user authorization
 */
/**
 * @swagger
 *  /user/auth/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in user panel with phone number
 *          description: one time password login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
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
 *  /user/auth/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check otp code
 *          description: one time password check
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *          responses:
 *              200:
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
 *  /user/auth/newRefreshToken:
 *      post:
 *          tags: [User-Authentication]
 *          summary: get refreshToken
 *          description: refreshToken
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
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
module.exports = { AuthRoutes: router };
