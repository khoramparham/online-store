const router = require("express").Router();
const { ProductController } = require("../../http/controller/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { imageFile } = require("../../utils/multer");

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  short_text:
 *                      type: string
 *                      description: the short_text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  category:
 *                      type: string
 *                      description:
 *                  price:
 *                      type: number
 *                      description:
 *                  discount:
 *                      type: number
 *                      description:
 *                  count:
 *                      type: number
 *                      description:
 *                  type:
 *                      type: number
 *                      description:
 *                  weight:
 *                      type: number
 *                      description: the weight of product packet
 *                  height:
 *                      type: number
 *                      description: the height of product packet
 *                  length:
 *                      type: number
 *                      description: the length of product packet
 *                  width:
 *                      type: number
 *                      description: the with of product packet
 */
/**
 * @swagger
 *  tags:
 *      name: Product(Admin Panel)
 *      description: Product modules
 */
/**
 * @swagger
 *  /admin/product/create:
 *    post:
 *      tags: [Product(Admin Panel)]
 *      summary: create product by admin
 *      requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *      responses:
 *              201:
 *                  description: created
 *              400:
 *                  description: bad Request
 *              401:
 *                  description: un authorization
 *              404:
 *                  description: not found
 *              500:
 *                  description: Internal Server Error
 */
router.post(
  "/create",
  imageFile.array("images", 10),
  stringToArray("tags"),
  ProductController.createProduct
);
/**
 * @swagger
 * /admin/product/getByID/{id}:
 *      get:
 *          tags: [Product(Admin Panel)]
 *          summary: get product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: product id
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
router.get("/getByID/:id", ProductController.getAllProduct);
/**
 * @swagger
 * /admin/product/getAll:
 *      get:
 *          tags: [Product(Admin Panel)]
 *          summary: get All product
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
router.get("/getAll", ProductController.getAllProduct);
/**
 * @swagger
 * /admin/product/update/{id}:
 *      patch:
 *          tags: [Product(Admin Panel)]
 *          summary: update product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: product id
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
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
router.patch("/update/:id", ProductController.updateProduct);
/**
 * @swagger
 * /admin/product/delete/{id}:
 *      delete:
 *          tags: [Product(Admin Panel)]
 *          summary: delete product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: product id
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
router.delete("/delete/:id", ProductController.deleteProduct);
module.exports = {
  ProductRoutes: router,
};
