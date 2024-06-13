require('dotenv').config();
const mongoose = require('mongoose');
const axios = require("axios");
const app = require('./app');

const clientOptions = { serverApi: { socketOptions: { connectTimeoutMS: 1000 }, version: '1', strict: true, deprecationErrors: true } };

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, clientOptions)
    } catch (error) {
        process.exit(1)
    }
}

app.listen(process.env.APP_PORT, async () => {
    connectToMongo()
    await axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            route: '/players',
            target: `http://localhost:${process.env.APP_PORT}`
        }
    })
    console.log("im live at " + process.env.APP_PORT)
}).on("error", async () => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/unregister',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            route: '/players',
        }
    })
})