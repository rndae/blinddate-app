const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultySchema = Schema({
  name: String
},
  { collection: 'facultys' }
);

var faculty = mongoose.model("Facultys", facultySchema);
module.exports = faculty;