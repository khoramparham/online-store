const mongoose = require("mongoose");
const CategoryModel = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: false },
});
module.exports = { CategoryModel: mongoose.model("category", CategoryModel) };
