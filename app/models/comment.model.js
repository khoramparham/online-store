const { default: mongoose } = require("mongoose");

const CommentModel = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "products", required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: new Date().now() },
});
module.exports = { CommentModel: mongoose.model("comment", CommentModel) };
