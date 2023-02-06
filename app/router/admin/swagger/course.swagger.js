/**
 * @swagger
 *  components:
 *      enums:
 *          types:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 *          status:
 *              type: string
 *              enum:
 *                  -   notStarted
 *                  -   Completed
 *                  -   Holding
 */
/**
 * @swagger
 *  tags:
 *      name: Course(Admin Panel)
 *      description: management course
 */
/**
 * @swagger
 *  components:
 *      schema:
 *          createCourse:
 *                  type: object
 *                  required:
 *                      -   title
 *                      -   short_text
 *                      -   text
 *                      -   image
 *                      -   category
 *                      -   type
 *                  properties:
 *                      title:
 *                          type: string
 *                          description: the title of product
 *                      short_text:
 *                          type: string
 *                          description: the short_text of product
 *                      text:
 *                          type: string
 *                          description: the text of product
 *                      tags:
 *                          type: array
 *                          description: the tags of product
 *                      image:
 *                          type: file
 *                          description: the index picture of course
 *                      category:
 *                          type: string
 *                          description: the id of category
 *                      price:
 *                          type: number
 *                          description: the price of course
 *                      discount:
 *                          type: number
 *                          description: the discount of course
 *                      type:
 *                          $ref: '#/components/enums/types'
 *                      status:
 *                          $ref: '#/components/enums/status'
 *          updateCourse:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: the title of course
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of course
 *                      example: متن توضیحات کامل دوره به صورت تستی
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the cqtegory of course
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of course
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of course
 *                      example: 20
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/enums/types'
 *                  status:
 *                      $ref: '#/components/enums/status'
 */
/**
 * @swagger
 *  /admin/course/create:
 *      post:
 *          tags: [Course(Admin Panel)]
 *          summary: create product by admin
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schema/createCourse'
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
/**
 * @swagger
 * /admin/course/getAll:
 *      get:
 *          tags: [Course(Admin Panel)]
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
/**
 * @swagger
 * /admin/course/search:
 *      get:
 *          tags: [Course(Admin Panel)]
 *          summary: get Course
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  required: true
 *                  type: string
 *                  description: text for search in title short_text and text
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
/**
 * @swagger
 * /admin/course/get/{id}:
 *      get:
 *          tags: [Course(Admin Panel)]
 *          summary: get Course by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: Course id
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
/**
 * @swagger
 *  /admin/course/update/{id}:
 *      patch:
 *          tags: [Course(Admin Panel)]
 *          summary: update Course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: Course id
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schema/updateCourse'
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
/**
 * @swagger
 * /admin/course/delete/{id}:
 *      delete:
 *          tags: [Course(Admin Panel)]
 *          summary: delete Course by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: Course id
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
