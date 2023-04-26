/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of category
 *                  parent:
 *                      type: string
 *                      description: id of category parent
 */
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
 *                              $ref: '#/components/schemas/Category'
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
 *              requestBody:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Category'
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
