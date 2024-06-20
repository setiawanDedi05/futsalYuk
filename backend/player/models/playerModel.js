const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid']
  },
  age: {
    type: Number,
    required: [true, "age required"],
  },
}, {
  versionKey: false
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = { Player };