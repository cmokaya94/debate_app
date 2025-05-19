// backend/debateModel.js
const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  player1AudioUrl: String,
  player1Feedback: String,
  player2AudioUrl: String,
  player2Feedback: String
});

const debateSchema = new mongoose.Schema({
  topic: String,
  totalRounds: Number,
  currentRound: { type: Number, default: 1 },
  rounds: [roundSchema]
});

module.exports = mongoose.model('Debate', debateSchema);