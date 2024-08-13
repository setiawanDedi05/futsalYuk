require('dotenv').config();
const axios = require("axios");
const app = require('./app');
const { dbconnect, dbclose } = require('./helpers/mongooserConnection');

app.listen(process.env.APP_PORT, async () => {
    dbconnect();
    await axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        headers: {
            'Content-Type' : 'application/json'
        },
        data: {
            route: '/comment',
            target: `http://localhost:${process.env.APP_PORT}`
        }
    })
    console.log(`im live at ${process.env.APP_PORT}`)
}).on("error", async () => {
    dbclose();
    await axios({
        method: 'post',
        url: 'http://localhost:3000/unregister',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            route: '/comment'
        }
    })
})