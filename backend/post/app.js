const express = require("express")
const postRouter = require("./routes/postRoute");
const app = express()

app.use(express.json());

app.use("/", postRouter); 

module.exports = app