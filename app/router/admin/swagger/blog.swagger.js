/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *          BlogUpdate:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 */
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
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *                  201:
 *                      description: created
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
/**
 * @swagger
 *  /admin/blog/updateBlog/{id}:
 *      patch:
 *          tags: [Blog(Admin Panel)]
 *          summary: update blog
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/BlogUpdate'
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
