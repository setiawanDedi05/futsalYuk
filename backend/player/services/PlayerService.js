const playerRepository = require("../repositories/PlayerRepository")
class PlayerService {
  async getAllPlayers() {
    return await playerRepository.findAll();
  }

  async getPlayerById(id){
    return await playerRepository.findById(id)
  }
}

module.exports = new PlayerService();
