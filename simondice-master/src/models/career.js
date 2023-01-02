const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const careerSchema = Schema({
  name: String,
  idFaculty: String

},
  { collection: 'careers' }
);

var career = mongoose.model("Careers", careerSchema);
module.exports = career;