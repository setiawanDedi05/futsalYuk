const express = require("express")
const postRouter = require("./routes/postRoute");
const errorHandlerMiddleware = require("./middleware/ErrorHandler");
const app = express()

app.use(express.json());

app.use("/", postRouter); 

app.use(errorHandlerMiddleware)

module.exports = app