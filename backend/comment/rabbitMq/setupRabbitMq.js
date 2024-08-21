const amqp = require("amqplib/callback_api");

const publishCommentCreated = (comment) => {
  amqp.connect(process.env.rabbit_MR_URL, (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
      if (error1) throw error1;

      const exchange = "comment_topic_exchange";

      channel.publish(
        exchange,
        "comment.created",
        Buffer.from(JSON.stringify(comment))
      );

      channel.close(() => connection.close());
    });
  });
};

const publishCommentDeleted = (comment) => {
  amqp.connect(process.env.rabbit_MR_URL, (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
      if (error1) throw error1;

      const exchange = "comment_topic_exchange";

      channel.publish(
        exchange,
        "comment.deleted",
        Buffer.from(JSON.stringify(comment))
      );

      channel.close(() => connection.close());
    });
  });
};

module.exports = { publishCommentCreated, publishCommentDeleted };

