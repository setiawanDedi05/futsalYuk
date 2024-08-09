const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const router = express.Router();
const registry = require("../utils/registry.json");
const { authenticateToken } = require("../middleware/auth");
const { rateLimitAndTimeout } = require("../middleware/rate_limiter");
const fs = require("fs");
const bodyParser = require("body-parser");

router.post(
  "/login",
  createProxyMiddleware({
    target: registry.services[0].target,
    changeOrigin: true,
    pathRewrite: {
      "^/login": "/login",
    },
    on: {
      proxyRes: (proxyRes, req, res) => {
        let body = "";
        proxyRes.on("data", (chunk) => {
          body += chunk;
          const { success, token } = JSON.parse(body);
          if (success) {
            res.setHeader("Authorization", `Bearer ${token}`);
            res.status(200).json({success});
          } else {
            res.status(401).json({success});
          }
        });
      },
    },
  })
);

router.post(
  "/players/register",
  createProxyMiddleware({
    target: "http://localhost:3005",
    changeOrigin: true,
    pathRewrite: {
      "^/players/register": "",
    },
    on: {
      proxyRes: (proxyRes, req, res) => {
        let body = "";
        proxyRes.on("data", (chunk) => {
          body += chunk;
          // const authResponse = JSON.parse(body);
          // res.status(200).json(authResponse);
        });
      },
    },
  })
);

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
  router.use(
    route,
    rateLimitAndTimeout,
    authenticateToken,
    createProxyMiddleware(proxyOptions)
  );
});

const apiAlreadyExist = (route) => {
  let exist = false;

  registry.services.forEach((service) => {
    if (service.route === route) {
      exist = true;
      return;
    }
  });

  return exist;
};

router.post("/register", bodyParser.json(), (req, res) => {
  const { route, target } = req.body;
  if (apiAlreadyExist(route)) {
    res.json({ message: "already exist" });
  } else {
    registry.services.push({ route, target });
    fs.writeFile("./utils/registry.json", JSON.stringify(registry), (error) => {
      if (error) {
        res.json({ message: "can't write service" });
      } else {
        res.json({ message: "successfully write server" });
      }
    });
  }
});

router.post("/unregister", bodyParser.json(), (req, res) => {
  const { route } = req.body;
  if (apiAlreadyExist(route)) {
    const index = registry.services.findIndex(
      (service) => service.route === route
    );
    registry.services.splice(index, 1);
    fs.writeFile("./utils/registry.json", JSON.stringify(registry), (error) => {
      if (error) {
        res.send("can't unregiste service");
      } else {
        res.send("successfully unregister server");
      }
    });
  }
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

module.exports = router;
