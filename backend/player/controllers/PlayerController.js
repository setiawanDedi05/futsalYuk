const CustomError = require("../models/custom_error")
const authClient = require("../helpers/authRpc");
const playerService = require("../services/PlayerService")

class PlayerController {
    async getAllPlayers(_req, res, next) {
        try {
            const players = await playerService.getAllPlayers()
            res.status(200).json({ data: players })
        } catch (error) {
            next(error)
        }
    }

    async getPlayerById(req, res, next) {
        try {
            const player = await playerService.getPlayerById(req.params.id)
            if (player) {
                res.status(200).json({ data: player })
            } else {
                throw new CustomError(`player with id ${req.params.id} not found`, 404)
            }
        } catch (error) {
            next(error)
        }
    }

    async registerPlayer(req, res, next) {
        const { email, age, name, password } = req.body;
        try {
            const [response, responseRpc] = await Promise.all([playerService.registerPlayer({ email, age, name }) ,authClient.request('register', { email, name, password })]);
            if (response && responseRpc.result.success) {
                res.status(201).json({ data: response, message: "register successfully" });
            } else {
                throw new CustomError(response.result.message, 400);
            }
        } catch (error) {
            next(error)
        }
    }

    async updatePlayer(req, res, next) {
        const { authorization } = req.headers
        try {
            // check apakah email player yng akan dihapus sama dengan email yang ada di token
            const [response, responseRpc] = await Promise.all([playerService.getPlayerById(req.params.id), authClient.request('getDataFromToken', { token : authorization })]);
            if(response && responseRpc.result.success){
                if(response.email === responseRpc.result.data.email){
                    const updatePlayer = await playerService.updatePlayerById(req.params.id, req.body);
                    res.status(200).json({ data: updatePlayer, message: "Update succesfully" });
                }else{
                    throw new CustomError('Unauthorized', 401);
                }
            }
        } catch (error) {
            next(error);
        }
    }

    async deletePlayer(req, res, next) {
        const { authorization } = req.headers
        try {
            // get data email berdasarkan id di mongodb dan get data email berdasarkan token jwt
            const [response, responseRpc] = await Promise.all([ playerService.getPlayerById(req.params.id) , authClient.request('getDataFromToken', { token : authorization })]);
            // check apakah kedua response benar
            if(response && responseRpc.result.success){
                // check email yang di mongodb sama dengan email yang dari token
                if(response.email === responseRpc.result.data.email){
                    // jika benar hapus player di mongodb dan di mysql
                    const [deletedResponse, deletedResponseRpc ] = await Promise.all([playerService.deletePlayerById(req.params.id), authClient.request('delete', { email : responseRpc.result.data.email, token: authorization }) ]);
                    // jika keduanya berhasil di hapus berikan response 200
                    if(deletedResponse && deletedResponseRpc.result.success){
                        res.status(200).json({ data: null, message: "Delete succesfully" });
                    }else{ //jika tidak throw error
                        throw new CustomError(deletedResponseRpc.result.message, 400);
                    }
                }else{ // jika email player yang akan di hapus tidak sama dengan email yang ada di token
                    throw new CustomError('Unauthorized', 401)
                }
            }else{
                throw new CustomError('Unauthorized', 401)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PlayerController();