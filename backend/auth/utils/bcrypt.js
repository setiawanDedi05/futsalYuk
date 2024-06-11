const bcrypt = require('bcrypt');
const saltRounds = 10;

function encryptPassword(plainPassword) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(plainPassword, salt);
}

function checkPassword(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
}

module.exports = {
    encryptPassword,
    checkPassword
}