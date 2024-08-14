const express = require("express")
const postRouter = require("./routes/postRoute");
const errorHandlerMiddleware = require("./middleware/ErrorHandler");
const { startMessageHandler } = require("./events/messageHandler");
const app = express()

app.use(express.json());

app.use("/", postRouter); 

startMessageHandler();

app.use(errorHandlerMiddleware)

module.exports = app