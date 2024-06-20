const jayson = require('jayson/promise');

const client = jayson.client.http('http://localhost:4000/rpc');

class AuthClient {
    async register(email, name, password) {
        return await client.request('register', {
            email, name, password
        });
    }

    async getDataFromToken(token){
        return await client.request('getDataFromToken', { token })
    }

    async delete(email, token){
        return await client.request('delete', { email, token });
    }
}

module.exports = AuthClient;