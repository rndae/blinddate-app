const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compatibilitySchema = Schema({
  
  id: { type: Number },
  preferenceType: { type: String},
  preferenceA: { type: String},
  preferenceB: {type: String},
  value: {type: Number}
},
  { collection: 'compatibilities' }
);
compatibilitySchema.methods.getValue = function () {
  return this.valor;
};

var Compatibilities = mongoose.model("Compatibilities", compatibilitySchema);
module.exports = Compatibilities;
