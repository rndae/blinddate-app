const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceSchema = Schema({
  name: { type: String},
  idCategory:{type: String},
},
  { collection: 'preferences' }
);

var preference = mongoose.model("Preferences", preferenceSchema);
module.exports = preference;