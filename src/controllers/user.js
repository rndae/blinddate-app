const User = require('../models/user');
const Faculty = require('../models/faculty');
const Career = require('../models/career');

exports.index = function (req, res) {
  User.find({}, function (error, users) {
    if (error) {
      res.send('Ha surgido un error.');
    } else {
      res.render('user/empareja', {
        users: users
      });
    }
  })
};
exports.create = async function (req, res) {
  facultys = await Faculty.find();
  careers = await Career.find();
  res.render('registrar', {
    facultys: facultys, 
    careers: careers});
};

exports.loginGet = function (req, res) {
  res.render('login');
};

exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}
