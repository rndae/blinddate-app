const express = require('express');
const User = require('../../models/user');
const Match = require('../../models/match');
const Grafo = require('./grafo');

var grafoUsuarios;
var estadoRegistro = "Registro sin iniciar";

async function cargarRegistro() {
  grafoUsuarios = new Grafo();
  console.log(estadoRegistro);
  User.find({}, async function (err, users) {
    if (err) {
      console.log("No se pudo realizar la operacion find() en 'users'");
      throw err;
    }
    console.log(users);
    for (var usuarioI in users) {
      grafoUsuarios.insertarElemento(users[usuarioI].id);
    }
    for (var usuarioI in users) {
      for (var usuarioJ in users) {
        if (users[usuarioI].id != users[usuarioJ].id) {
          var existePar = await existePareja(users[usuarioI].id,
            users[usuarioJ].id);
          if (!existePar) {
            await grafoUsuarios.conectar(users[usuarioI].id,
              users[usuarioJ].id);
          }
        }
      }
    }
  });
  estadoRegistro = "Registro OK";
  console.log(estadoRegistro);
}

async function insertarIdUsuario(idUsuario) {
  grafoUsuarios.insertarElemento(idUsuario);
  await User.find({}, async function (err, users) {
  for (var usuarioJ in users) {
      if (idUsuario != users[usuarioJ].id) {
        var existePar = await existePareja(idUsuario,
          users[usuarioJ].id);
        if (!existePar) {
          await grafoUsuarios.conectar(idUsuario,
            users[usuarioJ].id);
          await grafoUsuarios.conectar(users[usuarioJ].id,
              idUsuario);
        }
      }
    }
  });
}

async function existePareja(idUsuario1, idUsuario2) {
  return new Promise(function (resolve, reject) {
    Match.findOne({
      $or:
        [{
          $and: [
            { idUserA: idUsuario1 },
            { idUserB: idUsuario2 }
          ]
        },
        {
          $and: [
            { idUserA: idUsuario2 },
            { idUserB: idUsuario1 }
          ]
        }]
    }, function (err, pareja) {
      if (err) {
        console.log("No se pudo realizar la operacion "
          + "findOne() en 'matches'");
        throw err;
      }
      if (pareja == null) {
        console.log("No existe la pareja " + idUsuario1
          + " - " + idUsuario2);
        resolve(false);
      } else {
        console.log("Existe la pareja " + idUsuario1
          + " - " + idUsuario2);
        resolve(true);
      }
    }
    );
  }
  );
}

module.exports = {
  iniciarRegistro: cargarRegistro,
  obtenerEstado: () => estadoRegistro,
  obtenerPareja: (idUsuario) => grafoUsuarios.obtenerPareja(idUsuario),
  insertarIdUsuario: (idUsuario) => insertarIdUsuario(idUsuario),
  existePareja: (idUsuario1, idUsuario2) => existePareja(idUsuario1, idUsuario2),
}