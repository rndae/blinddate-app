const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const academicSchema = Schema({
  idCareer1: String,
  career1: String,
  idCareer2: String,
  career2: String,
  value: Number
},
  { collection: 'academicRules' }
);

var academicRule = mongoose.model('AcademicRules', academicSchema);
module.exports = academicRule;