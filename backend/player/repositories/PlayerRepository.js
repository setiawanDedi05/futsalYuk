const { Player } = require("../models/player_model");

class PlayerRepository {
  async findAll() {
    return  await Player.find({});
  }

  async findById(id){
    return await Player.findById(id);
  }
}

module.exports = new PlayerRepository();
