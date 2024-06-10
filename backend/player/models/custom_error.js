/**
 * this is a reusable class type definition for error
 * 
 * @memberOf Error
 * @property {string} message - The name of the description error.
 * @property {string} code - The http status code.
 */
class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

module.exports = CustomError