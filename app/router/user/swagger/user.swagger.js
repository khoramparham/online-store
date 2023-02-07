/**
 * @swagger
 *  tags:
 *      name: User-manage
 *      description: managing users
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          updateUser:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: first name of user
 *                  last_name:
 *                      type: string
 *                      description: last name of user
 *                  email:
 *                      type: string
 *                      description: email of user
 *                  password:
 *                      type: string
 *                      description: user password
 *                  birthday:
 *                      type: string
 *                      description: birth of user
 */
/**
 * @swagger
 *  /user/searchUser/{search}:
 *      get:
 *          tags: [User-manage]
 *          summary: search user
 *          parameters:
 *                  -   in: path
 *                      name: search
 *                      required: true
 *                      type: string
 *                      description: search input
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
 *  /user/updateUser:
 *      patch:
 *          tags: [User-manage]
 *          summary: update user profile
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/updateUser'
 *      responses:
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
