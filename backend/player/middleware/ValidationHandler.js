const { validationResult } = require('express-validator');
const CustomError = require('../models/custom_error');

function validationHandler(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next()
    } else {
        const errorMessages = errors.array().map(error => error.msg)
        const error =  new Error(errorMessages.join(", "))
        error.name = "BadRequest";
        throw error;
    }
}

module.exports = validationHandler;
