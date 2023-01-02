const express = require('express');
const UserController = require('../../controllers/user');
const Preference = require('../../models/preference');
const PreferenceCategory = require('../../models/preferenceCateory');
const PreferenceUser = require('../../models/preferenceUser');
const router = express.Router();

router.get('/preferencias', UserController.isAuthenticated, async (req, res) => {
  let userId = req.user.id;
  preferencesCategories = await PreferenceCategory.find();
  preferences = await Preference.find();
  preferencesUsers = await PreferenceUser.find();
  res.render('user/preferencia',{
            preferencesCategories:preferencesCategories,
            preferences:preferences,
            preferencesUsers:preferencesUsers});
});

router.post('/preferencias', UserController.isAuthenticated, async (req, res) => {
  let userId = req.user.id;
  let preferenceUser = new PreferenceUser({
    idUser: userId,
    idPreference: req.body.preference
  });
  preferenceUser.save(function(err){
    res.redirect('/preferencias');
  });
});

router.post('/preferencia', UserController.isAuthenticated, async (req, res) => {
  let preference = new Preference({
    name: req.body.preferenceN,
    idCategory: req.body.preferenceCat
  });
  preference.save(function(err){
    console.log(err);
    res.redirect('preferencias');
  });
});

router.get('/preferencias/:id', UserController.isAuthenticated, async (req, res) => {
  //let userId = req.user.id;
  let { id } = req.params;
  await PreferenceUser.deleteOne({_id: id}, 
    res.redirect('/preferencias'));
});

module.exports = router;