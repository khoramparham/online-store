const Controller = require("./../../controller");
class UserController extends Controller {
  findUserByID(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  findUserByName(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  updateUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  deleteUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { UserController: new UserController() };
