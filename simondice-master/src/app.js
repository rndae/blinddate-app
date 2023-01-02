const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const registroUsuarios = require('./routes/user/registro');
const administradorReglas = require('./routes/administradorreglas');

//initializations
const app = express();
require('./passport/local-auth');

//connection to db
mongoose.connect('mongodb://localhost:27017/simondicedb',
  { useNewUrlParser: true })
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

//settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
administradorReglas.cargarMapa();
registroUsuarios.iniciarRegistro();
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage');
  res.locals.user = req.user;
  next();
});

//routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/user/empareja'));
app.use('/', require('./routes/user/citas'));
app.use('/', require('./routes/user/preferencia'));
app.use('/', require('./routes/admin'));

//starting the server
app.listen(app.get('port'), () => {
  console.log('server on port ', app.get('port'));
});