const {
  CourseController,
} = require("../../http/controller/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { imageFile } = require("../../utils/multer");
const router = require("express").Router();

router.post(
  "/create",
  imageFile.single("image"),
  stringToArray("tags"),
  CourseController.createCourse
);
router.get("/getAll", CourseController.getAllCourse);
router.get("/search", CourseController.searchCourse);
router.get("/get/:id", CourseController.getCourseByID);
router.patch(
  "/update/:id",
  imageFile.single("image"),
  stringToArray("tags"),
  CourseController.updateCourse
);
router.delete("/delete/:id", CourseController.deleteCourse);
module.exports = { CourseRoutes: router };
