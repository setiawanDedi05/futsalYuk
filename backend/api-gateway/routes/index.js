const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware");
const router = express.Router();
const registry = require("../utils/registry.json")
const { authenticateToken } = require('../middleware/auth');
const { rateLimitAndTimeout } = require("../middleware/rate_limiter");

router.post('/login', createProxyMiddleware({
    target: registry.services[0].target,
    changeOrigin: true,
    pathRewrite: {
        '^/login': '/login'
    },
    on: {
        proxyRes: (proxyRes, req, res) => {
            let body = '';
            proxyRes.on('data', (chunk) => {
                body += chunk;
                const authResponse = JSON.parse(body);
                if (authResponse.success) {
                    res.setHeader('Authorization', `Bearer ${authResponse.token}`);
                    res.status(200).json(authResponse);
                } else {
                    res.status(401).json(authResponse);
                }
            });
        }
    }
}));

//  Set up proxy middleware for each microservice
registry.services.forEach(({ route, target }) => {
    // Proxy options
    const proxyOptions = {
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: "",
        },
    };

    // Apply rate limiting and timeout middleware before proxying
    router.use(route, rateLimitAndTimeout, authenticateToken, createProxyMiddleware(proxyOptions));
});

// Handler for route-not-found
router.use((_req, res) => {
    res.status(404).json({
        code: 404,
        status: "Error",
        message: "Route not found.",
        data: null,
    });
});

module.exports = router