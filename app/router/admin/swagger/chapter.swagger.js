/**
 * @swagger
 *  tags:
 *      name: Chapter(Admin Panel)
 *      description: management Chapter
 */
/**
 * @swagger
 *  components:
 *      schema:
 *          addChapter:
 *                  type: object
 *                  required:
 *                      -   id
 *                      -   title
 *                  properties:
 *                      id:
 *                          type: string
 *                          description: the title of chapter
 *                      title:
 *                          type: string
 *                          description: the title of chapter
 *                      text:
 *                          type: string
 *                          description: the text of chapter
 *                      episodes:
 *                          type: array
 *                          description: the episodes of chapter
 *          updateChapter:
 *                  type: object
 *                  required:
 *                      -   title
 *                  properties:
 *                      title:
 *                          type: string
 *                          description: title of chapter
 *                      text:
 *                          type: string
 *                          description: the title of chapter
 *                      episodes:
 *                          type: array
 *                          description: the episodes of chapter
 */
/**
 * @swagger
 *  /admin/course/addChapter:
 *      put:
 *          tags: [Chapter(Admin Panel)]
 *          summary: add chapter to course by admin
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schema/addChapter'
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
 *  /admin/getChapter:
 *      get:
 *          tags: [Chapter(Admin Panel)]
 *          summary: get chapter of course by admin
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
 *  /admin/chapter/update/{id}:
 *      patch:
 *              tags: [Chapter(Admin Panel)]
 *              summary: update chapter by admin
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      required: true
 *                      type: string
 *                      description: chapter id
 *              requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  $ref: '#/components/schema/updateChapter'
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
 *  /admin/chapter/delete/{id}:
 *      delete:
 *              tags: [Chapter(Admin Panel)]
 *              summary: delete chapter by admin
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      required: true
 *                      type: string
 *                      description: chapter id
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
