const express = require("express")
const playerRouter = require("./routes/PlayerRoute");
const errorHandlerMiddleware = require("./middleware/ErrorHandler");
const app = express()

app.use(express.json());

app.use("/", playerRouter);

app.use(errorHandlerMiddleware)

module.exports = app