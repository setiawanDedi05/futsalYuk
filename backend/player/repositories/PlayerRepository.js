const { Player } = require("../models/player_model");

class PlayerRepository {
  async findAll() {
    return await Player.find();
  }

  async findById(id) {
    return await Player.findById(id).exec();
  }

  async create(player) {
    const newPlayer = new Player(player)
    return await newPlayer.save();
  }

  async update(id, player) {
    return  await Player.findByIdAndUpdate(id, player, {
        returnOriginal: false,
        runValidators: true
      })
  }

  async destroy(id) {
    return await Player.findByIdAndDelete(id)
  }
}

module.exports = new PlayerRepository();
