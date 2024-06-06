const express = require('express')
const app = express()
const axios = require("axios")
require('dotenv').config();

app.use(express.json());

const products = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
];

app.get('/', (req, res) => {
    res.json(products)
})

app.get('/friends', (req, res) => {
    res.json({ "message": "hello all friends" })
})

app.post('/friends', (req, res) => {
    res.send("hello all friends")
})

app.listen(process.env.APP_PORT, async () => {
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            route: '/chats',
            target: `http://localhost:${process.env.APP_PORT}`
        }
    })
    console.log(result.data)
    console.log(`I'm alive at ${process.env.APP_PORT} world`)
}).on("error", async () => {
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/unregister',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            route: '/chats',
        }
    })
    console.log(result.data)
})