const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  team: {
    required: true,
    type: String
  },
  games_played: {
    required: true,
    type: Number
  },
  win: {
    required: true,
    type: Number
  },
  draw: {
    required: true,
    type: Number
  },
  loss: {
    required: true,
    type: Number
  },
  goals_for: {
    required: true,
    type: Number
  },
  goals_against: {
    required: true,
    type: Number
  },
  points: {
    required: true,
    type: Number
  }
}, { collection: 'nodetest' });

module.exports = mongoose.model('Data', dataSchema);