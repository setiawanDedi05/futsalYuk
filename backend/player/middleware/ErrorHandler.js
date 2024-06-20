const errorHandlerMiddleware = (err, req, res, next) => {
    switch (err.name) {
        case "CastError":
            res.status(400).json({ errors: "Wrong Id" });
            break;
        case "NotFound":
            res.status(404).json({ errors: err.message });
            break;
        case "BadRequest":
            res.status(400).json({ errors: err.message });
            break;
        case "Unauthorized":
            res.status(403).json({ errors: err.message });
            break;
        case "MongoServerError":
        case "MongooseError":
        case "RPCError":
        default:
            res.status(500).json({ errors: "Internal Server Error" });
            break;
    };
}

module.exports = errorHandlerMiddleware;
