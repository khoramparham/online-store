const router = require("express").Router();
const { ProductController } = require("../../http/controller/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { imageFile } = require("../../utils/multer");

router.post(
  "/create",
  verifyAccessToken,
  imageFile.array("images", 10),
  stringToArray("tags"),
  ProductController.createProduct
);
router.get("/getByID/:id", ProductController.getAllProduct);
router.get("/getAll", ProductController.getAllProduct);
router.get("/searchProduct", ProductController.searchProduct);
router.patch(
  "/update/:id",
  imageFile.array("images", 10),
  stringToArray("tags"),
  ProductController.updateProduct
);
router.delete("/delete/:id", ProductController.deleteProduct);
module.exports = {
  ProductRoutes: router,
};
