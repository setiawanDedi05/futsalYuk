const express = require("express");
const app = express();
const notificationRouter = require("./routes/notificationRoute");

app.use(express.json);

app.use("/", notificationRouter);

module.exports = app;
