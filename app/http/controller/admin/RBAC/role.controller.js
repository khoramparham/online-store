const Controller = require("./../../controller");
const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-errors");
// VALIDATORS
const { addRoleSchema } = require("../../../validator/admin/RBAC.schema");
// MODELS
const { default: mongoose } = require("mongoose");
const { RoleModel } = require("../../../../models/role.model");
// FUNCTIONS
const {
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../../utils/function");

class RoleController extends Controller {
  async createNewRole(req, res, next) {
    try {
      const { title, permissions } = await addRoleSchema.validateAsync(req.body);
      await this.findRoleWithTitle(title);
      const role = await RoleModel.create({ title, permissions });
      if (!role) throw createHttpError.InternalServerError("نقش ایجاد نشد");
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "نقش باموفقیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllRoles(req, res, next) {
    try {
      const roles = await RoleModel.find({});
      return res.status(StatusCodes.OK).json({
        roles,
        statusCode: StatusCodes.OK,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeRole(req, res, next) {
    try {
      const { field } = req.params;
      const role = await this.findRoleWithIdOrTitle(field);
      const removeRoleResult = await RoleModel.deleteOne({ _id: role._id });
      if (!removeRoleResult.deletedCount)
        throw createHttpError.InternalServerError("حذف نقش انجام نشد");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        success: true,
        message: "حذف نقش با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateRoleByID(req, res, next) {
    try {
      const { id } = req.params;
      const role = await this.findRoleWithIdOrTitle(id);
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data, []);
      const updateRoleResult = await RoleModel.updateOne(
        { _id: role._id },
        {
          $set: data,
        }
      );
      if (!updateRoleResult.modifiedCount)
        throw createHttpError.InternalServerError("ویرایش نقش انجام نشد");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        success: true,
        message: "ویرایش نقش با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async findRoleWithTitle(title) {
    const role = await RoleModel.findOne({ title });
    if (role) throw createHttpError.BadRequest("نقش یا رول  قبلا ثبت شده");
  }
  async findRoleWithIdOrTitle(field) {
    let findQuery = mongoose.isValidObjectId(field) ? { _id: field } : { title: field };
    const role = await RoleModel.findOne(findQuery);
    if (!role) throw createHttpError.NotFound("نقش مورد نظر یافت نشد");
    return role;
  }
}

module.exports = {
  RoleController: new RoleController(),
};
