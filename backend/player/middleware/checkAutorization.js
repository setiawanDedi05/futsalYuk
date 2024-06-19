const authClient = require('../helpers/authRpc');
const { checkRpcResult } = require('../helpers/checkRpcResult');
const CustomError = require('../models/custom_error');
const PlayerService = require('../services/PlayerService');

async function checkAuthorization(req, _res, next) {
    const { authorization } = req.headers
    try {
        const rpcResult = await authClient.request('getDataFromToken', { token: authorization })
        checkRpcResult(rpcResult);
        const response = await PlayerService.getPlayerById(req.params.id);
        if(!response) {
            const error = new Error(`Player with id ${req.params.id} not found`);
            error.name = "NotFound"
            next(error);
        }
        if (response.email === rpcResult.result.data.email) {
            req.dataFromMiddleware = response;
            next()
        } else {
            throw new CustomError('Unauthorized', 401);
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { checkAuthorization };
