const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  "Team": {
    required: true,
    type: String
  },
  "Games Played": {
    required: true,
    type: Number
  },
  "Win": {
    required: true,
    type: Number
  },
  "Draw": {
    required: true,
    type: Number
  },
  "Loss": {
    required: true,
    type: Number
  },
  "Goals For": {
    required: true,
    type: Number
  },
  "Goals Against": {
    required: true,
    type: Number
  },
  "Points": {
    required: true,
    type: Number
  },
  "Year": {
    required: true,
    type: Number
  }
}, { collection: 'test' });

module.exports = mongoose.model('Data', dataSchema);