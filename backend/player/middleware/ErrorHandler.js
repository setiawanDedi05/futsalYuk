const mongoose = require('mongoose');

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: err.message });
    }

    res.status(500).send({ message: 'Internal Server Error' });
}

module.exports = errorHandler;
