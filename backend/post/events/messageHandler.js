const amqp = require("amqplib/callback_api");
const { Post } = require("../models/postModel");

const handleMessage = async (msg) => {
  const newComment = JSON.parse(msg.content.toString());

  try {
    const findedPost = factoryUpdate(newComment);
    if (findedPost) {
      console.log("post updated");
    } else {
      console.log("not found");
    }
  } catch (error) {
    console.log("Error : ", error);
  }
};

const startMessageHandler = () => {
  amqp.connect(process.env.rabbit_MR_URL, (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
      if (error1) throw error1;

      const queue = "comment";
      channel.assertQueue(queue, { durable: false });

      channel.consume(
        queue,
        (msg) => {
          handleMessage(msg);
        },
        {
          noAck: true,
        }
      );
    });
  });
};

const factoryUpdate = async (msg) => {
  switch (msg.type) {
    case 'create':
      return await Post.findByIdAndUpdate(
        msg.postId,
        {
          $push: { comments: msg.commentId },
        },
        { new: true }
      );
    case 'delete': 
      return await Post.findByIdAndUpdate(
        msg.postId,
        {
          $pull: { comments: msg.commentId },
        }
      );
    default:
      break;
  }
}

module.exports = { startMessageHandler };
