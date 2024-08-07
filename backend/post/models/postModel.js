const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId },
  content: String,
  media: [String],
  likes: [{ type: mongoose.Schema.Types.ObjectId}],
  comments: [{ type: mongoose.Schema.Types.ObjectId}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
