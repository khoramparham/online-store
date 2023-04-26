const {
  ChapterController,
} = require("../../http/controller/admin/course/chapter.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { imageFile } = require("../../utils/multer");
const router = require("express").Router();

router.put("/addChapter", ChapterController.addChapter);
router.patch("/update/:id", ChapterController.updateChapterByID);
router.get("getChapter", ChapterController.getChapterOfCourse);
router.delete("/delete/:id", ChapterController.deleteChapter);
module.exports = { ChapterRoutes: router };
