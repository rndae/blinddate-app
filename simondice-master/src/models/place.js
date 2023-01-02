const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = Schema({
  place: String
},
  { collection: 'places' }
);

placeSchema.methods.getLugar = function () {
  return this.place;
};

var place = mongoose.model("Places", placeSchema);
module.exports = place;