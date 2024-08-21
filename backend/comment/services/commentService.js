const amqp = require("amqplib/callback_api");
const { publishCommentCreated, publishCommentDeleted } = require("../rabbitMq/setupRabbitMq");

class CommentService {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  async create(comment) {
    try {
      const response = await this.commentRepository.create(comment);
      const newComment = JSON.stringify({
        postId: comment.postId,
        commentId: response._id,
        type: "create",
      });

      publishCommentCreated(newComment);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(commentId) {
    try {
      const response = await this.commentRepository.delete(commentId);
      if (!response) {
        const error = new Error("Not Found");
        error.name = "NotFound";
        throw error;
      }

      const deletedComment = JSON.stringify({
        postId: response.postId,
        commentId,
        type: "delete",
      });

      publishCommentDeleted(deletedComment)

      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentService;
