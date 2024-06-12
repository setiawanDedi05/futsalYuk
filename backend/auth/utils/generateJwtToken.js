const jwt = require('jsonwebtoken');
/**
 * this function for generate jwt token
    @params user object
    @params secret_key string
    @returns string the return is token jwt
*/

function generateToken(user, secret_key) {
    const payload = { userId: user.id, email: user.email };
    const token = jwt.sign(payload, secret_key, { expiresIn: '1h' });
    return token;
}

module.exports = {
    generateToken
}