const mongoose = require('mongoose');

function errorHandler(err, _req, res) {
    res.status(err.httpCode).send({ message: err.message });
}

module.exports = errorHandler;
