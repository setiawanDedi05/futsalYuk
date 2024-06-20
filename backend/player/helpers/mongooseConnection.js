require('dotenv').config();
const mongoose = require('mongoose');
const clientOptions = { serverApi: { socketOptions: { connectTimeoutMS: 1000 }, version: '1', strict: true, deprecationErrors: true } };

async function dbconnect() {
    await mongoose.connect(process.env.NODE_ENV === 'test' ? `${process.env.MONGO_URL}-test` : process.env.MONGO_URL, clientOptions)
}

function dbclose() {
    return mongoose.disconnect();
}

module.exports = { dbconnect, dbclose };