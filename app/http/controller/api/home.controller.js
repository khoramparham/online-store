const Controller = require("../controller");

module.exports =new class home extends Controller {
  home(req, res, next) {
    return res.status(200).send("hello");
  }
};
