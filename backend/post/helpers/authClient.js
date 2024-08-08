const jayson = require('jayson/promise');

const client = jayson.client.http('http://localhost:4000/rpc');

class AuthClient {
    async getDataFromToken(token){
        return await client.request('getDataFromToken', { token })
    }
}

module.exports = AuthClient;