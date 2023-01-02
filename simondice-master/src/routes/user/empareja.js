const express = require('express');
const User = require('../../models/user');
const Match = require('../../models/match');
const registroUsuarios = require('./registro');
const generar = require('./generarcita');
const UserController = require('../../controllers/user');

const router = express.Router();

router.get('/emparejar', UserController.isAuthenticated, (req, res) => {
  res.render('user/empareja', { usrEncontrado: -1 });
});

router.post('/emparejar', UserController.isAuthenticated, async (req, res) => {
  var idUsuarioSolicitante = req.user.id;
  var idUsuarioSolicitado =
        registroUsuarios.obtenerPareja(idUsuarioSolicitante);
  var encuentra = await registroUsuarios.existePareja(idUsuarioSolicitante,
    idUsuarioSolicitado);
  console.log(idUsuarioSolicitado);
  if (encuentra) {
    idUsuarioSolicitado = "";
  }
  if (idUsuarioSolicitado !== "") {
    console.log("Se emparejo al usuario "
        + idUsuarioSolicitante + " con " + idUsuarioSolicitado);
    var pareja = [{
        idUserA: idUsuarioSolicitante,
        idUserB: idUsuarioSolicitado
    }];
    Match.insertMany(pareja, function (error, doc) { });
    generar.generarCita(idUsuarioSolicitante, idUsuarioSolicitado);
  } else {
    console.log("No se pudo emparejar al usuario " + idUsuarioSolicitante);
  }
  if (idUsuarioSolicitado !== "") {
    res.render('user/empareja', { usrEncontrado: 1 });
    return;
  } else {
    res.render('user/empareja', { usrEncontrado: 0 });
    return;
  }
});

module.exports = router;