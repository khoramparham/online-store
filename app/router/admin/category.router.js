const router = require("express").Router();
const { CategoryController } = require("../../http/controller/admin/category.controller");
/**
 * @swagger
 *  tags:
 *      name: Admin-Category
 *      description: Category modules
 */
router.post("/createCategory", CategoryController.createCategory);
/**
 * @swagger
 * /admin/createCategory:
 *          post:
 *              tags: [Admin-category]
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
router.get("/getCategoryByID/:id", CategoryController.getCategoryByID);
/**
 * @swagger
 * /admin/getCategoryByID/{id}:
 *          get:
 *              tags: [Admin-category]
 *              summary: get category with id
 *              parameters:
 *              -   name: id
 *                  description: category id
 *                  in: path
 *                  required: true
 *                  type: string
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
router.get("/getCategoryBySlug/:slug", CategoryController.getCategoryBySlug);
/**
 * @swagger
 * /admin/getCategoryBySlug/{slug}:
 *          get:
 *              tags: [Admin-category]
 *              summary: get category with slug name
 *              parameters:
 *              -   name: slug
 *                  description: slug name
 *                  in: path
 *                  required: true
 *                  type: string
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
router.patch("/updateCategory", CategoryController.updateCategory);
/**
 * @swagger
 * /admin/updateCategory:
 *          patch:
 */
router.delete("/deleteCategoryByID/:id", CategoryController.deleteCategoryByID);
/**
 * @swagger
 * /admin/deleteCategoryByID/{id}:
 *          delete:
 *              tags: [Admin-category]
 *              summary: get category with id
 *              parameters:
 *              -   name: id
 *                  description: category id
 *                  in: path
 *                  required: true
 *                  type: string
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
module.exports = { adminRoutes: router };
