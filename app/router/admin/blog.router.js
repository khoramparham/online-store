const { AdminBlogController } = require("../../http/controller/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { imageFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      name: Blog(Admin Panel)
 *      description: made blog management user panel
 */

/**
 * @swagger
 *  /admin/blog/createBlog:
 *      post:
 *          tags: [Blog(Admin Panel)]
 *          summary: create blog doc
 *          consumer:
 *              - multipart/form-data
 *              - application/x-www-form-data-urlencoded
 *          parameters:
 *          -   in: formData
 *              name: title
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: text
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: short_text
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: image
 *              required: true
 *              type: file
 *          -   in: formData
 *              name: tags
 *              required: true
 *              type: string
 *              example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *          -   in: formData
 *              name: category
 *              required: true
 *              type: string
 *          responses:
 *                  201:
 *                      description: create
 *                  400:
 *                      description: bad Request
 *                  401:
 *                      description: un authorization
 *                  404:
 *                      description: not found
 *                  500:
 *                      description: Internal Server Error
 */
router.post(
  "/createBlog",
  imageFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.createBlog
);
/**
 * @swagger
 * /admin/blog/getBlogByIDv1/{id}:
 *      get:
 *          tags: [Blog(Admin Panel)]
 *          summary: get blog by id with aggregate
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: blog id
 *          responses:
 *                  200:
 *                      description: success
 *                  400:
 *                      description: bad Request
 *                  401:
 *                      description: un authorization
 *                  404:
 *                      description: not found
 *                  500:
 *                      description: Internal Server Error
 */
router.get("/getBlogByIDv1/:id", AdminBlogController.getBlogByIDv1);
/**
 * @swagger
 * /admin/blog/getBlogByIDv2/{id}:
 *      get:
 *          tags: [Blog(Admin Panel)]
 *          summary: get blog by id find by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: blog id
 *          responses:
 *                  200:
 *                      description: success
 *                  400:
 *                      description: bad Request
 *                  401:
 *                      description: un authorization
 *                  404:
 *                      description: not found
 *                  500:
 *                      description: Internal Server Error
 */
router.get("/getBlogByIDv2/:id", AdminBlogController.getBlogByIDv2);
/**
 * @swagger
 * /admin/blog/getAllBlog:
 *      get:
 *          tags: [Blog(Admin Panel)]
 *          summary: get all blog
 *          responses:
 *                  200:
 *                      description: success
 *                  400:
 *                      description: bad Request
 *                  401:
 *                      description: un authorization
 *                  404:
 *                      description: not found
 *                  500:
 *                      description: Internal Server Error
 */
router.get("/getAllBlog", AdminBlogController.getAllBlog);
/**
 * @swagger
 *  /admin/blog/updateBlog/{id}:
 *      patch:
 *          tags: [Blog(Admin Panel)]
 *          summary: update blog
 *          consumer:
 *              - multipart/form-data
 *              - application/x-www-form-data-urlencoded
 *          parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              type: string
 *              description: blog id
 *          -   in: formData
 *              name: title
 *              type: string
 *          -   in: formData
 *              name: text
 *              type: string
 *          -   in: formData
 *              name: short_text
 *              type: string
 *          -   in: formData
 *              name: image
 *              type: file
 *          -   in: formData
 *              name: tags
 *              type: string
 *              example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *          -   in: formData
 *              name: category
 *              type: string
 *          responses:
 *                  201:
 *                      description: create
 *                  400:
 *                      description: bad Request
 *                  401:
 *                      description: un authorization
 *                  404:
 *                      description: not found
 *                  500:
 *                      description: Internal Server Error
 */
router.patch(
  "/updateBlog/:id",
  imageFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.updateBlog
);
/**
 * @swagger
 * /admin/blog/deleteBlogByID/{id}:
 *      delete:
 *          tags: [Blog(Admin Panel)]
 *          summary: delete blog by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: blog id
 *          responses:
 *                  200:
 *                      description: success
 *                  400:
 *                      description: bad Request
 *                  401:
 *                      description: un authorization
 *                  404:
 *                      description: not found
 *                  500:
 *                      description: Internal Server Error
 */
router.delete("/deleteBlogByID/:id", AdminBlogController.deleteBlogByID);
module.exports = { BlogRoutes: router };
