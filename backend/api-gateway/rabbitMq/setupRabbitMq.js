const amqp = require("amqplib/callback_api");

const setupRabbitMq = () => {
  amqp.connect(process.env.rabbit_MR_URL, (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
      if (error1) throw error1;

      const commentsExchange = "comment_topic_exchange";
      channel.assertExchange(commentsExchange, "topic", { durable: true });

      const notificationExchange = "notification_topic_exchange";
      channel.assertExchange(notificationExchange, "topic", { durable: true });

      console.log("RabbitMq Setup completed");
      channel.close(() => connection.close());
    });
  });
};

module.exports = setupRabbitMq;