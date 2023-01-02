const Map = require('./user/mapapreferencias');
const AcademicRule = require('../models/academicRule');

var mapRules;

async function cargarMapa() {
  mapRules = new Map(['carrera']);
  await AcademicRule.find(async function (err, rules) {
    if (err) {
      throw err;
    }
    rules.forEach(async rule => {
      await mapRules.insertarRegla(
        'carrera', rule.idCareer1,
        rule.idCareer2, rule.value);
    });
  });
}

function insertarRegla(career1, career2, value) {
  mapRules.insertarRegla('carrera', career1, career2, value);
}

async function eliminarRegla(id) {
  await AcademicRule.findById(id, function (err, rule) {
    mapRules.eliminarRegla('carrera', rule.idCareer1, rule.idCareer2, async function () {
      await AcademicRule.deleteOne({ _id: id });
    });
  });
}

function obtenerValorRegla(career1, career2) {
  return mapRules.obtenerValorRegla('carrera', career1, career2);
}

function existeRegla(preferenciaA, preferenciaB) {
  return mapRules.existeRegla('carrera', preferenciaA, preferenciaB);
}

module.exports = {
  cargarMapa: cargarMapa,
  insertarRegla: insertarRegla,
  obtenerValorRegla: obtenerValorRegla,
  eliminarRegla: eliminarRegla,
  existeRegla: existeRegla
};