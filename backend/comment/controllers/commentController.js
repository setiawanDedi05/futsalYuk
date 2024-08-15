const { Comment } = require("../models/commentModel");
class CommentController {
  constructor(commentService) {
    this.commentService = commentService;
  }

  async createComment(req, res, next) {
    const { userId, content, postId } = req.body;
    const newComment = new Comment({
      postId,
      userId,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    try {
      const response = await this.commentService.create(newComment);
      res.status(201).json({
        data: response,
        message: "comment created",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    const { commentId } = req.body;
    try {
      const response = await this.commentService.delete(commentId);
      res.status(201).json({
        data: response,
        message: "comment deleted"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
