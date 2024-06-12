require('dotenv').config();
const express = require('express');
const app = express();
const router = require("./routes")
const jayson = require('jayson');
const authController = require("./controllers")
app.use(express.json())

const jsonRpcMethods = {
  register: (args, callback) => {
    const { email, name, password } = args;
    authController.createUser(email, name, password, callback)
  },
  delete: (args, callback) => {
    const { email, token } = args;
    authController.deleteUser(email, token, callback)
  }
};

// Buat server JSON-RPC
const jsonRpcServer = jayson.server(jsonRpcMethods);

app.post('/rpc', (req, res) => {
  jsonRpcServer.call(req.body, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response);
    }
  });
});

app.use("/", router)

app.listen(process.env.APP_PORT, () => {
  console.log(`runing at http://localhost:${process.env.APP_PORT} world`);
});