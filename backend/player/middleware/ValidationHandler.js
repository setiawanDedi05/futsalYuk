const { validationResult } = require('express-validator');

function validationHandler(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next()
    } else {
        res.status(400).json({ message: errors.errors });
    }
}

module.exports = validationHandler;
