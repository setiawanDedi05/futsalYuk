/**
 * this function to remove Bearer from authorization header
 * @param {string} token 
 * @returns {string} newToken
 */
function removeBearer(token) {
    return token.split(" ")[1];
}

module.exports = {
    removeBearer
}