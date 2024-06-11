const CustomError = require("../models/custom_error")
const playerService = require("../services/PlayerService")
const jayson = require('jayson/promise');

const authClient = jayson.client.http('http://localhost:4000/rpc');
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
            const response = await authClient.request('register', { email, name, password });
            if (response.result.success) {
                const newPlayer = await playerService.registerPlayer({ email, age, name });
                res.status(201).json({ data: newPlayer, message: "register successfully" });
            } else {
                const e = new CustomError(response.result.message, 400)
                throw e;
            }
        } catch (error) {
            next(error)
        }
    }

    async updatePlayer(req, res, next) {
        try {
            const updatePlayer = await playerService.updatePlayerById(req.params.id, req.body);
            if (updatePlayer) {
                res.status(200).json({ data: updatePlayer, message: "Update succesfully" });
            } else {
                throw new CustomError(`player with id ${req.params.id} not found`, 404)
            }
        } catch (error) {
            next(error);
        }
    }

    async deletePlayer(req, res) {
        try {
            const deletedPlayer = await playerService.deletePlayerById(req.params.id);
            if (deletedPlayer) res.status(200).json({ data: deletedPlayer, message: null });
            res.status(404).json({ data: null, message: `player with id ${req.params.id} not found` });
        } catch (error) {
            res.status(500).json({ data: null, message: error.message });
        }
    }
}

module.exports = new PlayerController();