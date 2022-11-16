const router = require("express").Router();
const homeController = require("../../http/controller/api/home.controller");
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

/**
 * @swagger
 *  tags:
 *      name: home
 *      description: home api
 */
/**
 * @swagger
 *  //:
 *      get:
 *          tags: [home]
 *          summary: home
 *          description: home api
 *          parameters:
 *          -       in: header
 *                  name: access-token
 *                  example: bearer
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
router.get("/", verifyAccessToken, homeController.home);
module.exports = {
  homeRoutes: router,
};
