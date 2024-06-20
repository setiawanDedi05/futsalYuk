const { checkRpcResult } = require('../helpers/checkRpcResult');
const AuthClient = require('../models/authRpc');
const PlayerService = require('../services/PlayerService');

async function checkAuthorization(req, _res, next) {
    const { authorization } = req.headers
    try {
        const rpcResult = await new AuthClient().getDataFromToken(authorization);
        checkRpcResult(rpcResult);
        const response = await PlayerService.getPlayerById(req.params.id);
        if (!response) {
            const error = new Error(`Player with id ${req.params.id} not found`);
            error.name = "NotFound"
            next(error);
        }
        if (response.email === rpcResult.result.data.email) {
            req.dataFromMiddleware = response;
            next()
        } else {
            const error = new Error('Unauthorized');
            error.name = "Unauthorized";
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { checkAuthorization };
