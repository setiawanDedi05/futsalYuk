const errorHandlerMiddleware = (err, req, res, next) => {
    switch (err.name) {
        case "MongoServerError":
            res.status(400).json({ errors: "Player Already Exist" });
            break;
        case "CastError":
            res.status(400).json({ errors: "Wrong Id" });
            break;
        default:
            res.status(err.code || 500).json({ errors: err.message || "Internal Server Error" });
            break;
    };
}

module.exports = errorHandlerMiddleware;
