const mongoose = require("mongoose");
const CategoryModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "category", default: undefined },
  },
  {
    id: false,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);
CategoryModel.virtual("children", {
  ref: "category",
  localField: "_id",
  foreignField: "parent",
});
function autoPopulate(next) {
  this.populate([{ path: "children", select: { __v: 0, id: 0 } }]);
  next();
}
CategoryModel.pre("findOne", autoPopulate).pre("find", autoPopulate);
module.exports = { CategoryModel: mongoose.model("category", CategoryModel) };
