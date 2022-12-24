const router = require("express").Router();
const { CategoryController } = require("../../http/controller/admin/category.controller");
/**
 * @swagger
 *  tags:
 *      name: Category(Admin Panel)
 *      description: Category modules
 */

/**
 * @swagger
 * /admin/category/create:
 *          post:
 *              tags: [Category(Admin Panel)]
 *              summary: create category
 *              requestBody:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                 title:
 *                                     description: category name
 *                                     type: string
 *                                 slug:
 *                                     description: category slug
 *                                     required: false
 *                                     type: string
 *              responses:
 *                  201:
 *                      description: create success
 *                  400:
 *                      description: bad Request
 *                  401:
 *                      description: un authorization
 *                  404:
 *                      description: not found
 *                  500:
 *                      description: Internal Server Error
 */
router.post("/create", CategoryController.createCategory);
/**
 * @swagger
 *  /admin/category/getParent:
 *          get:
 *              tags: [Category(Admin Panel)]
 *              summary: get parent category
 *              responses:
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
router.get("/getParent", CategoryController.getParent);
/**
 * @swagger
 * /admin/category/getByID/{id}:
 *          get:
 *              tags: [Category(Admin Panel)]
 *              summary: get category with id
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      required: true
 *                      type: string
 *                      description: category id
 *              responses:
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
router.get("/getByID/:id", CategoryController.getCategoryByID);
/**
 * @swagger
 * /admin/category/getAllCategoryV1:
 *          get:
 *              tags: [Category(Admin Panel)]
 *              summary: get category with lookup
 *              responses:
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
router.get("/getAllCategoryV1", CategoryController.getAllCategoryV1);
/**
 * @swagger
 * /admin/category/getAllCategoryV2:
 *          get:
 *              tags: [Category(Admin Panel)]
 *              summary: get category with by graphLookup
 *              responses:
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
router.get("/getAllCategoryV2", CategoryController.getAllCategoryV2);
/**
 * @swagger
 * /admin/category/getAllCategoryV3:
 *          get:
 *              tags: [Category(Admin Panel)]
 *              summary: get category with virtual
 *              responses:
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
router.get("/getAllCategoryV3", CategoryController.getAllCategoryV3);
/**
 * @swagger
 * /admin/category/update/{id}:
 *          patch:
 *              tags: [Category(Admin Panel)]
 *              summary: update category
 *              parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: category id
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *                  description: category title
 *              responses:
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
router.patch("/update/:id", CategoryController.updateCategory);
/**
 * @swagger
 * /admin/category/deleteByID/{id}:
 *          delete:
 *              tags: [Category(Admin Panel)]
 *              summary: get category with object id
 *              parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: category id
 *              responses:
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
router.delete("/deleteByID/:id", CategoryController.deleteByID);
module.exports = { CategoryRoutes: router };
