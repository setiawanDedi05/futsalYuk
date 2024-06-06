const playerService = require("../services/PlayerService")
class PlayerController {
    async getAllPlayers(req, res) {
        try {
            const players = await playerService.getAllPlayers()
            res.status(200).json({ content: players })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getPlayerById(req, res) {
        try {
            const player = await playerService.getPlayerById(req.params.id)
            res.status(200).json({ content: player })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new PlayerController();