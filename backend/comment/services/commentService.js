const amqp = require("amqplib/callback_api");

class CommentService {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  async create(comment) {
    amqp.connect(process.env.rabbit_MR_URL, (error0, connection) => {
      if (error0) throw error0;

      connection.createChannel((error1, channel) => {
        if (error1) throw error1;

        const queue = "create_comment";
        const msg = JSON.stringify({
          postId: comment.postId,
          commentId: "1", //ini ganti dengan comment id
        });

        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log("[x] Sent %s", msg)
      });
    });
    return await this.commentRepository.create(comment);
  }
}

module.exports = CommentService;
