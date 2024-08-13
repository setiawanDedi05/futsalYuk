const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId },
  userId: { type: mongoose.Schema.Types.ObjectId },
  content: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };
