const { Player } = require("../models/player_model");

class PlayerRepository {
  async findAll() {
    return await Player.find({});
  }

  async findById(id) {
    return await Player.findById(id);
  }

  async create(player) {
    const newPlayer = new Player(player)
    return await newPlayer.save();
  }

  async update(id, player) {
    try {
      const updatePlayer = await Player.findByIdAndUpdate(id, player, {
        returnOriginal: false,
        runValidators: true
      })
      return updatePlayer;
    } catch (error) {
      throw error
    }
  }

  async destroy(id) {
    const result = await Player.findByIdAndDelete(id).exec()
    return result;
  }
}

module.exports = new PlayerRepository();
