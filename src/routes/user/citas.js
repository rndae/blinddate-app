const express = require('express');
const Appointment = require('../../models/appointment');
const router = express.Router();
const UserController = require('../../controllers/user');

router.get('/citas', UserController.isAuthenticated, async (req, res) => {
  let userId = req.user.id;
  await Appointment.find({
    $or: [
      { idApplicant: userId },
      { idRequested: userId }]
  },
    function (err, dates) {
      console.log('citas: ', dates);
      res.render('user/citas', {
        dates: dates,
        userId: userId
      });
    });
});

router.get('/accept/:id', UserController.isAuthenticated, async (req, res) => {
  let userId = req.user.id;
  let { id } = req.params;
  console.log('userId: ', userId);
  console.log('id de la cita: ', id);
  await Appointment.findById(id).then(async date => {
    console.log('date: ', date);
    if (userId == date.idApplicant) {
      date.status1 = "accept";
    }
    if (userId == date.idRequested) {
      date.status2 = "accept";
    }
    await date.save();
    res.redirect('/citas');
  });
});

router.get('/refuse/:id', UserController.isAuthenticated, async (req, res) => {
  let { id } = req.params;
  await Appointment.remove({ _id: id });
  res.redirect('/citas');
});

module.exports = router;