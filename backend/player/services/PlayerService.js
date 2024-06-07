const playerRepository = require("../repositories/PlayerRepository")
class PlayerService {
  async getAllPlayers() {
    return await playerRepository.findAll();
  }

  async getPlayerById(id){
    return await playerRepository.findById(id);
  }

  async registerPlayer(player){
    return await playerRepository.create(player);
  }

  async updatePlayerById(id, player){
    try {
      return await playerRepository.update(id, player);
    } catch (error) {
      throw error
    }
  }

  async deletePlayerById(id){
    try {
      const result = await playerRepository.destroy(id);
    } catch (error) {
      throw error
    }
  }
}

module.exports = new PlayerService();
