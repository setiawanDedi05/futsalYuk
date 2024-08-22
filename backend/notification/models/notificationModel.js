const { default: mongoose } = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId },
  userId: { type: mongoose.Schema.Types.ObjectId },
  commentId: { type: mongoose.Schema.Types.ObjectId },
  message: String,
  status: { type: String, default: "unread" },
  type: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = { Notification };
