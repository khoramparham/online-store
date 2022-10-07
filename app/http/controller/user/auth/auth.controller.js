class UserAuthController {
  async login(req, res, next) {
    try {
        return res.status(200).json({})
    } catch (error) {
        next(error)
    }
  }
}
module.exports = {
  UserAuthController: new UserAuthController(),
};
