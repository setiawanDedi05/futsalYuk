const jayson = require('jayson/promise');

const authClient = jayson.client.http('http://localhost:4000/rpc');

module.exports = authClient;