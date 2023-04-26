const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const { default: mongoose } = require("mongoose");
// MODELS AND VALIDATOR
const { CourseModel } = require("../../../../models/course.model");
const {
  createCourseSchema,
  updateCourseSchema,
} = require("../../../validator/admin/course.schema");
// FUNCTION
const {
  imageRequest,
  deleteFileInPublic,
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../../utils/function");
let blackListFields = [
  "time",
  "chapters",
  "episodes",
  "students",
  "bookmarks",
  "likes",
  "dislikes",
  "comments",
  "fileUploadPath",
  "filename",
];
Object.freeze(blackListFields);

class CourseController extends Controller {
  async createCourse(req, res, next) {
    try {
      const course = await createCourseSchema.validateAsync(req.body);
      const image = imageRequest(course.fileUploadPath, course.fileName);
      console.log(image);
      const { title, short_text, text, tags, category, price, discount, type, status } =
        req.body;
      if (Number(price) > 0 && type === "free")
        throw createError.BadRequest("برای دوره ی رایگان نمیتوان قیمت ثبت کرد");
      const courseCreated = await CourseModel.create({
        title,
        short_text,
        text,
        image,
        tags,
        category,
        price,
        discount,
        type,
        status,
        teacher: req.user._id,
      });
      if (!courseCreated?._id) throw createError.InternalServerError("دوره ثبت نشد");
      return res.status(StatusCodes.CREATED).json({
        courseCreated,
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "دوره با موفقیت ایجاد شد",
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getAllCourse(req, res, next) {
    try {
      const course = await CourseModel.find({}).sort({ _id: -1 });
      return res.status(StatusCodes.OK).json({
        course,
        statusCode: StatusCodes.OK,
        success: true,
        message: "دوره مورد نظر یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getCourseByID(req, res, next) {
    try {
      const ID = req.params.id;
      const course = await this.findCourseByID(ID);
      return res.status(StatusCodes.OK).json({
        course,
        statusCode: StatusCodes.OK,
        success: true,
        message: "دوره مورد نظر یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async searchCourse(req, res, next) {
    try {
      const search = req.query?.search;
      let courses;
      if (search) {
        courses = await CourseModel.find({ $text: { $search: search } })
          .populate([
            { path: "category", select: { title: 1 } },
            {
              path: "teacher",
              select: { first_name: 1, last_name: 1, mobile: 1, email: 1 },
            },
          ])
          .sort({ _id: -1 });
      } else {
        courses = await CourseModel.find({})
          .populate([
            { path: "category", select: { title: 1 } },
            {
              path: "teacher",
              select: { first_name: 1, last_name: 1, mobile: 1, email: 1 },
            },
          ])
          .sort({ _id: -1 });
      }
      return res.status(StatusCodes.OK).json({
        courses,
        statusCode: StatusCodes.OK,
        success: true,
        message: "دوره مورد نظر یافت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateCourse(req, res, next) {
    try {
      const courseID = req.params.id;
      const oldCourse = await this.findCourseByID(courseID);
      const course = await updateCourseSchema.validateAsync(req.body);
      const data = copyObject(course);
      deleteInvalidPropertyInObject(data, blackListFields);
      if (req.file) {
        data.image = imageRequest(course.fileUploadPath, course.fileName);
        deleteFileInPublic(oldCourse.image);
      }
      const updatedCourse = await CourseModel.findByIdAndUpdate(
        { id: courseID },
        { $set: data }
      );
      return res.status(StatusCodes.OK).json({
        updatedCourse,
        statusCode: StatusCodes.OK,
        success: true,
        message: "به روزرسانی دوره با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCourse(req, res, next) {
    try {
      const ID = req.params.id;
      await this.findCourseByID(ID);
      const course = await CourseModel.findOneAndDelete(ID);
      return res.status(StatusCodes.OK).json({
        course,
        statusCode: StatusCodes.OK,
        success: true,
        message: "دوره مورد نظر حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async findCourseByID(ID) {
    if (!mongoose.isValidObjectId(ID))
      throw createError.BadRequest("ایدی ارسال شده صحیح نمی باشد");
    const course = await CourseModel.findById(ID);
    if (!course) throw createError.NotFound("دوره مورد نظر یافت نشد");
    return course;
  }
}
module.exports = { CourseController: new CourseController() };
