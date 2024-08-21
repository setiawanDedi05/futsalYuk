const express = require("express");
const postRouter = require("./routes/postRoute");
const errorHandlerMiddleware = require("./middleware/ErrorHandler");

const {
  consumeCommentCreated,
  consumeCommentDeleted,
} = require("./rabbitMq/setupRabbitMq");
const app = express();

app.use(express.json());

app.use("/", postRouter);

consumeCommentCreated();
consumeCommentDeleted();

app.use(errorHandlerMiddleware);

module.exports = app;

