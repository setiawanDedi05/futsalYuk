const CustomError = require("../models/custom_error");

function checkRpcResult(rpcResult) {
    if(!rpcResult.result.success){
        throw new CustomError(rpcResult.result.message, 401);
    }
}

module.exports = {
    checkRpcResult
}