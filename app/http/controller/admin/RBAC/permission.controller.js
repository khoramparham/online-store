const Controller = require("./../../controller");
const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-errors");
// VALIDATORS
const { addPermissionSchema } = require("../../../validator/admin/RBAC.schema");
// MODELS
const { PermissionsModel } = require("../../../../models/permission");
const {
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../../utils/function");
class PermissionController extends Controller {
  async createNewPermission(req, res, next) {
    try {
      const { name, description } = await addPermissionSchema.validateAsync(req.body);
      await this.findPermissionWithName(name);
      const permission = await PermissionsModel.create({ name, description });
      if (!permission) throw createHttpError.InternalServerError("دسترسی ایجاد نشد");
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "دسترسی باموفقیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllPermissions(req, res, next) {
    try {
      const permissions = await PermissionsModel.find({});
      return res.status(StatusCodes.OK).json({
        permissions,
        statusCode: StatusCodes.OK,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  async removePermission(req, res, next) {
    try {
      const { id } = req.params;
      await this.findPermissionWithID(id);
      const removePermissionResult = await PermissionsModel.deleteOne({ _id: id });
      if (!removePermissionResult.deletedCount)
        throw createHttpError.InternalServerError("دسترسی حذف نشد");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        success: true,
        message: "دسترسی با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updatePermissionByID(req, res, next) {
    try {
      const { id } = req.params;
      await this.findPermissionWithID(id);
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data, []);
      const updatePermissionResult = await PermissionsModel.updateOne(
        { _id: id },
        {
          $set: data,
        }
      );
      if (!updatePermissionResult.modifiedCount)
        throw createHttpError.InternalServerError("ویرایش سطح انجام نشد");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        success: true,
        message: "ویرایش سطح با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async findPermissionWithName(name) {
    const permission = await PermissionsModel.findOne({ name });
    if (permission) throw createHttpError.BadRequest("دسترسی قبلا ثبت شده");
  }
  async findPermissionWithID(_id) {
    const permission = await PermissionsModel.findOne({ _id });
    if (!permission) throw createHttpError.NotFound("دسترسی یافت نشد");
    return permission;
  }
}

module.exports = {
  PermissionController: new PermissionController(),
};
