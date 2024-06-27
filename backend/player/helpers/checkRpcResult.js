function checkRpcResult(rpcResult) {
    console.log(rpcResult)
    if(rpcResult.result.errorCode === 500){
        const error =  new Error(rpcResult.result.message);
        error.name = "RPCError"
        throw error;
    }
    if(rpcResult.result.errorCode === 400){
        const error =  new Error(rpcResult.result.message);
        error.name = "BadRequest"
        throw error;
    }
}

module.exports = {
    checkRpcResult
}