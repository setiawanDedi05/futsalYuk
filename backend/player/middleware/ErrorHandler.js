const errorHandlerMiddleware = (err, req, res, next) => {
    switch (err.name) {
        case "MongoServerError":
            res.status(500).json({ errors: err.message });
            break;
        case "CastError":
            res.status(400).json({ errors: "Wrong Id" });
            break;
        case "NotFound":
            res.status(404).json({ errors: err.message });
            break;
        case "BadRequest":
            res.status(400).json({ errors: err.message });
            break;
        case "MongooseError":
        default:
            res.status(err.code || 500).json({ errors: err.message || "Internal Server Error" });
            break;
    };
}

module.exports = errorHandlerMiddleware;
