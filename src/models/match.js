const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = Schema({
  idUserA: Number,
  idUserB: Number
},
  { collection: 'matches' }
);

var Match = mongoose.model("Match", MatchSchema);
module.exports = Match;