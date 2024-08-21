require('dotenv').config();
require('winston-daily-rotate-file');
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimitAndTimeout } = require("./middleware/rate_limiter");
const routers = require("./routes")
const PORT = process.env.APP_PORT;
const expressWinston = require('express-winston')
const { transports, format } = require('winston');
const logger = require('./utils/logger');
const setupRabbitMq = require('./rabbitMq/setupRabbitMq');

const myFormat = format.printf(({ level, meta, timestamp }) => {
    return `${timestamp} ${level}: ${meta.message}`
})

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(helmet()); // Add security headers
app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))

setupRabbitMq();

app.disable("x-powered-by"); // Hide Express server information
app.use(rateLimitAndTimeout); // Apply the rate limit and timeout middleware to the proxy

app.use("/", routers)
// Start Express server
app.listen(PORT, () => {
    console.log(`Gateway is running on port ${PORT}`);
});