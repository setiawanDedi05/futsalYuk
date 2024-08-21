const amqp = require("amqplib/callback_api");
const { Post } = require("../models/postModel");
const PostRepository = require("../repositories/postRepository");
const PostService = require("../services/postService");

const postRepository = new PostRepository(Post);
const postService = new PostService(postRepository);

const publisNotification = (notificationData) => {
  amqp.connect(process.env.rabbit_MR_URL, (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
      if (error1) throw error1;

      const exchange = "notification_topic_exchange";
      channel.publish(
        exchange,
        "notification.comment",
        Buffer.from(JSON.stringify(notificationData))
      );
      console.log("notification change");
      channel.close(() => connection.close());
    });
  });
};

const consumeCommentCreated = () => {
  amqp.connect(process.env.rabbit_MR_URL, (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
      if (error1) throw error1;

      const exchange = "comment_topic_exchange";
      const queue = "post_service_queue";
      const key = "comment.created";
      channel.assertQueue(queue, { durable: true });
      channel.bindQueue(queue, exchange, key);

      channel.consume(
        queue,
        (msg) => {
          const comment = JSON.parse(JSON.parse(msg.content.toString()));

          postService
            .pushCommentInPost(comment.postId, comment.commentId)
            .then(() => {
              publisNotification({
                postId: comment.postId,
                commentId: comment.commentId,
                comment: comment.message,
              });
            })
            .catch((err) => console.log(err));
          console.log("receive comment created");
        },
        {
          noAck: true,
        }
      );
      console.log("PostService is consuming messages from exchange created");
    });
  });
};

const consumeCommentDeleted = () => {
  amqp.connect(process.env.rabbit_MR_URL, (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
      if (error1) throw error1;

      const exchange = "comment_topic_exchange";
      const queue = "post_service_queue";
      const key = "comment.deleted";
      channel.assertQueue(queue, { durable: true });
      channel.bindQueue(queue, exchange, key);

      channel.consume(
        queue,
        (msg) => {
          const comment = JSON.parse(JSON.parse(msg.content.toString()));
          postService.popCommentInPost(comment.postId, comment.commentId);
          console.log("receive comment deleted");
        },
        {
          noAck: true,
        }
      );

      console.log("PostService is consuming messages from exchange delete");
    });
  });
};

module.exports = { consumeCommentCreated, consumeCommentDeleted };
