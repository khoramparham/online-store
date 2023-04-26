const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
// MODELS AND VALIDATOR
const { CourseModel } = require("../../../../models/course.model");
const { deleteInvalidPropertyInObject } = require("../../../../utils/function");

class ChapterController extends Controller {
  async addChapter(req, res, next) {
    try {
      const { ID, title, text } = req.body;
      await this.findCourseByID(ID);
      const saveChapter = await CourseModel.updateOne(
        { _id: ID },
        { $push: { chapters: { title, text, episodes: [] } } }
      );
      if (saveChapter.modifiedCount == 0) throw createError.BadRequest("فصل افزوده نشد");
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "فصل با موفقیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateChapterByID(req, res, next) {
    try {
      const chapterID = req.params.id;
      await this.getOneChapter(chapterID);
      const data = req.body;
      deleteInvalidPropertyInObject(date, ["title", "text"]);
      const updateChapterResult = await CourseModel.updateOne(
        { "chapters._id": chapterID },
        { $set: { "chapters.$": data } }
      );
      if (updateChapterResult.modifiedCount == 0)
        throw createError.InternalServerError("بروزرسانی دوره انجام نشد");
      return res.status(StatusCodes.OK).json({
        status: success,
        statusCode: StatusCodes.OK,
        message: "دروه مورد نظر بروز شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getChapterOfCourse(req, res, next) {
    try {
      const courseID = req.params.courseID;
      const course = await this.getOneChapter(courseID);
      return res.status(StatusCodes.OK).json({
        course,
        status: success,
        statusCode: StatusCodes.OK,
        message: "دروه مورد نظر یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteChapter(req, res, next) {
    try {
      const chapterID = req.params.id;
      await this.getOneChapter(chapterID);
      const removeChapterResult = await CourseModel.updateOne(
        { "chapters._id": chapterID },
        { $pull: { chapters: { _id: chapterID } } }
      );
      if (removeChapterResult.modifiedCount == 0)
        throw createError.InternalServerError("حذف دوره انجام نشد");
      return res.status(StatusCodes.OK).json({
        status: success,
        statusCode: StatusCodes.OK,
        message: "دروه مورد نظر حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneChapter(ID) {
    if (!mongoose.isValidObjectId(ID))
      throw createError.BadRequest("ایدی ارسال شده صحیح نمی باشد");
    const chapter = await CourseModel.findOne(
      { "chapters._id": ID },
      { "chapters.$": 1 }
    );
    if (!chapter) throw createError.NotFound("دوره مورد نظر یافت نشد");
    return chapter;
  }
  async findCourseByID(ID) {
    if (!mongoose.isValidObjectId(ID))
      throw createError.BadRequest("ایدی ارسال شده صحیح نمی باشد");
    const course = await CourseModel.findById(ID);
    if (!course) throw createError.NotFound("دوره مورد نظر یافت نشد");
    return course;
  }
}
module.exports = { ChapterController: new ChapterController() };
