const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceCategorySchema = Schema({
  name: { type: String},
},
  { collection: 'preferencesCategories' }
);

var preferenceCategory = mongoose.model("PreferencesCategories", preferenceCategorySchema);
module.exports = preferenceCategory;