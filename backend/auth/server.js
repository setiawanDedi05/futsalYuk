// auth.js
const express = require('express');
const app = express();
const router = require("./routes")
require('dotenv').config();

app.use(express.json())

app.use("/", router)

app.listen(process.env.APP_PORT, () => {
  console.log(`runing at http://localhost:${process.env.APP_PORT} world`);
});