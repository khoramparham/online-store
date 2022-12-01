const { default: mongoose } = require("mongoose");

const ProductModel = new mongoose.Schema(
  {
    name: {},
    size: {},
    وزن,
    category: {},
    prise: {},
  },
  { timestamps: true }
);
module.exports = {
  ProductModel: mongoose.model("product", ProductModel),
};
