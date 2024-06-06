const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { rateLimitAndTimeout } = require("./middleware/rate_limiter");
const routers = require("./routes")
require('dotenv').config();
const PORT = process.env.APP_PORT;

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(helmet()); // Add security headers
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information

// // Apply the rate limit and timeout middleware to the proxy
app.use(rateLimitAndTimeout);

app.use("/", routers )
// Start Express server
app.listen(PORT, () => {
    console.log(`Gateway is running on port ${PORT}`);
});