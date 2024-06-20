const playerService = require("../services/PlayerService");
const { checkRpcResult } = require("../helpers/checkRpcResult");
const AuthClient = require("../models/authRpc");

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
                const error =  new Error(`player with id ${req.params.id} not found`);
                error.name = "NotFound";
                next(error);
            }
        } catch (error) {
            next(error)
        }
    }

    async registerPlayer(req, res, next) {
        const { email, age, name, password } = req.body;
        try {
            const rpcResult = await new AuthClient().register(email, name, password);
            checkRpcResult(rpcResult)
            const response = await playerService.registerPlayer({ email, age, name });
            res.status(201).json({ data: response, message: "register successfully" });
        } catch (error) {
            next(error)
        }
    }

    async updatePlayer(req, res, next) {
        try {
            const updatePlayer = await playerService.updatePlayerById(req.params.id, req.body);
            res.status(200).json({ data: updatePlayer, message: "Update succesfully" });
        } catch (error) {
            next(error);
        }
    }

    async deletePlayer(req, res, next) {
        const { authorization } = req.headers
        try {
            const rpcResult = await new AuthClient().delete(req.dataFromMiddleware.email, authorization);
            checkRpcResult(rpcResult);
            const deletedResponse = await playerService.deletePlayerById(req.params.id); 
            res.status(200).json({ data: deletedResponse, message: "Delete succesfully" });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PlayerController();