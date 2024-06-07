const playerService = require("../services/PlayerService")
class PlayerController {
    async getAllPlayers(req, res) {
        try {
            const players = await playerService.getAllPlayers()
            res.status(200).json({ status: 200, data: players, message: null })
        } catch (error) {
            res.status(500).json({ status: 500, data: null, message: error.message })
        }
    }

    async getPlayerById(req, res) {
        try {
            const player = await playerService.getPlayerById(req.params.id)
            res.status(200).json({ status: 200, data: player, message: null })
        } catch (error) {
            res.status(500).json({ status: 500, data: null, message: error.message })
        }
    }

    async registerPlayer(req, res) {
        try {
            const newPlayer = await playerService.registerPlayer(req.body);
            res.status(201).json({ status: 201, data: newPlayer, message: "register successfully" });
        } catch (error) {
            res.status(500).json({ status: 500, data: null, message: error.message })
        }
    }

    async updatePlayer(req, res, next) {
        try {
            const updatePlayer = await playerService.updatePlayerById(req.params.id, req.body);
            if (updatePlayer) {
                res.status(200).json({ status: 200, data: updatePlayer, message: "Update succesfully" });
                return
            }
            res.status(404).json({ status: 404, data: null, message: `player with id ${req.params.id} not found` });
        } catch (error) {
            next(error);
            // if (error instanceof mongoose.Error.ValidationError) {
            //     return res.status(400).send({ message: error.message });
            // }
            // res.status(500).json({ status: 500, data: null, message: error.message });
        }
    }

    async deletePlayer(req, res) {
        try {
            const deletedPlayer = await playerService.deletePlayerById(req.params.id);
            if (deletedPlayer) res.status(200).json({ status: 200, data: deletedPlayer, message: null });
            res.status(404).json({ status: 404, data: null, message: `player with id ${req.params.id} not found` });
        } catch (error) {
            res.status(500).json({ status: 500, data: null, message: error.message });
        }
    }
}

module.exports = new PlayerController();