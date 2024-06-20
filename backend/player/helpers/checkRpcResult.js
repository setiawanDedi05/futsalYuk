function checkRpcResult(rpcResult) {
    if(!rpcResult.result.success){
        const error =  new Error(rpcResult.result.message);
        error.name = "RPCError"
        throw error;
    }
}

module.exports = {
    checkRpcResult
}