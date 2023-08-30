const { GraphQLString } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
// Types
const { ResponseType } = require("../typeDefs/public.type");
// Models
const { BlogModel } = require("../../models/blog.model");
const { CourseModel } = require("../../models/course.model");

const CreateCommentForBlog = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    blogID: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { comment, blogID, parent } = args;
    if (!mongoose.isValidObjectId(blogID))
      throw createHttpError.BadGateway("شناسه بلاگ ارسال شده صحیح نمیباشد");
    await checkExistBlog(blogID);
    if (parent && mongoose.isValidObjectId(parent)) {
      const commentDocument = await getComment(BlogModel, parent);
      if (commentDocument && !commentDocument?.openToComment)
        throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
      const createAnswerResult = await BlogModel.updateOne(
        {
          "comments._id": parent,
        },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToComment: false,
            },
          },
        }
      );
      if (!createAnswerResult.modifiedCount) {
        throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد");
      }
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          message: "پاسخ شما با موفقیت ثبت شد",
        },
      };
    } else {
      await BlogModel.updateOne(
        { _id: blogID },
        {
          $push: {
            comments: {
              comment,
              user: user._id,
              show: false,
              openToComment: true,
            },
          },
        }
      );
    }
    return {
      statusCode: HttpStatus.CREATED,
      data: {
        message: "ثبت نظر با موفقیت انجام شد پس از تایید در وبسایت قرار میگیرد",
      },
    };
  },
};

const CreateCommentForCourse = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    courseID: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { comment, courseID, parent } = args;
    if (!mongoose.isValidObjectId(courseID))
      throw createHttpError.BadGateway("شناسه بلاگ ارسال شده صحیح نمیباشد");
    await checkExistCourse(courseID);
    if (parent && mongoose.isValidObjectId(parent)) {
      const commentDocument = await getComment(CourseModel, parent);
      if (commentDocument && !commentDocument?.openToComment)
        throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
      const createAnswerResult = await CourseModel.updateOne(
        {
          _id: courseID,
          "comments._id": parent,
        },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToComment: false,
            },
          },
        }
      );
      if (!createAnswerResult.modifiedCount) {
        throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد");
      }
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          message: "پاسخ شما با موفقیت ثبت شد",
        },
      };
    } else {
      await CourseModel.updateOne(
        { _id: courseID },
        {
          $push: {
            comments: {
              comment,
              user: user._id,
              show: false,
              openToComment: true,
            },
          },
        }
      );
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          message: "ثبت نظر با موفقیت انجام شد پس از تایید در وبسایت قرار میگیرد",
        },
      };
    }
  },
};

async function getComment(model, id) {
  const findedComment = await model.findOne({ "comments._id": id }, { "comments.$": 1 });
  const comment = copyObject(findedComment);
  if (!comment?.comments?.[0])
    throw createHttpError.NotFound("کامنتی با این مشخصات یافت نشد");
  return comment?.comments?.[0];
}

async function checkExistCourse(id) {
  const course = await CourseModel.findById(id);
  if (!course) throw createHttpError.NotFound("بلاگی با این مشخصات یافت نشد");
  return course;
}

async function checkExistBlog(id) {
  const blog = await BlogModel.findById(id);
  if (!blog) throw createHttpError.NotFound("بلاگی با این مشخصات یافت نشد");
  return blog;
}
module.exports = { CreateCommentForBlog, CreateCommentForCourse };
