const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-auto-increment');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

AutoIncrement.initialize(mongoose);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const UserSchema = Schema({
  id: { type: Number },
  name: { type: String, required: false },
  birthdate: { type: Date, required: false },
  sex: { type: String, required: false },
  course: { type: String, required: false },
  semester: { type: Number, required: false },
  sexOrientation: { type: String, required: false },
  minAge: { type: Number, required: false },
  maxAge: { type: Number, required: false },
  email: { type: String, unique: true, required: false },
  password: { type: String, required: false }
},
  { collection: 'users' }
);

UserSchema.methods.getName = function () {
  return this.nombre;
};

UserSchema.methods.getAge = function () {
  var fechaActual = (new Date());
  var edad = fechaActual.getYear() - this.birthdate.getYear();
  const mesDiaActual = fechaActual.getMonth() * 100 + fechaActual.getDate();
  const mesDiaUsuario = this.birthdate.getMonth() * 100
      + this.birthdate.getDate();
  if (mesDiaActual < mesDiaUsuario) {
    edad -= 1;
  }
  return edad;
};

UserSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(AutoIncrement.plugin, { model: 'user', field: 'id' });

var User = mongoose.model("User", UserSchema);
module.exports = User;