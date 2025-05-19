
const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  player1AudioUrl: String,
  player2AudioUrl: String,
  player1Feedback: String,
  player2Feedback: String
});

const debateSchema = new mongoose.Schema({
  topic: String,
  rounds: [roundSchema],
  currentRound: {
    type: Number,
    default: 1
  },
  totalRounds: {
    type: Number,
    default: 2
  }
});

module.exports = mongoose.model('Debate', debateSchema);
