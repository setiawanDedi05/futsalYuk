const playerRepository = require("../repositories/PlayerRepository")
class PlayerService {
  async getAllPlayers() {
    return await playerRepository.findAll();
  }

  async getPlayerById(id) {
    return await playerRepository.findById(id);
  }

  async registerPlayer(player) {
    return await playerRepository.create(player);
  }

  async updatePlayerById(id, player) {
    return await playerRepository.update(id, player);
  }

  async deletePlayerById(id) {
    return await playerRepository.destroy(id);
  }
}

module.exports = new PlayerService();
