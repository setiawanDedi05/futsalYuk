const express = require('express')
const app = express()
require('dotenv').config();
const axios = require('axios')

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

app.listen(process.env.APP_PORT, () => {
    console.log(`I'm alive at ${process.env.APP_PORT} world`)
})