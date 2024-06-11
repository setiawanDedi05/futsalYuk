require('dotenv').config();
const express = require("express")
const mongoose = require('mongoose');
const axios = require("axios")
const playerRouter = require("./routes/PlayerRoute");
const errorHandlerMiddleware = require("./middleware/ErrorHandler");
const app = express()


const clientOptions = { serverApi: { socketOptions: { connectTimeoutMS: 1000 }, version: '1', strict: true, deprecationErrors: true } };

app.use(express.json());

app.use("/", playerRouter);

app.use(errorHandlerMiddleware)

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, clientOptions)
        app.listen(process.env.APP_PORT, async () => {
            const result = await axios({
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
    } catch (error) {
        process.exit(1)
    }
}

startServer()