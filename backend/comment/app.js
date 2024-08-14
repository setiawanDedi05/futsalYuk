const express = require("express");
const errorHandlerMiddleware = require("./middleware/ErrorHandler");
const commentRouter = require("./routes/commentRoute")
const app = express();

app.use(express.json());

app.use("/", commentRouter)

app.use(errorHandlerMiddleware);

module.exports = app