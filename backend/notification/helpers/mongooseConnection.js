require("dotenv").config();
const mongoose = require("mongoose");

async function dbconnect() {
  await mongoose.connect(
    process.env.NODE_ENV === "test"
      ? `${process.env.MONGO_URL}-test`
      : process.env.MONGO_URL
  );
}

function dbclose() {
  return mongoose.disconnect();
}

module.exports = { dbclose, dbconnect };
