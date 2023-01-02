const PriorityQueue = require('./colaprioridad');
const compatibilidad = require('./listafunciones');

class Grafo {
  constructor() {
    this._grafo = [];
  }

  insertarElemento(userID) {
    /** La variable a,b representa [otroUserId, compatibilidad con userID]. */
    var cola = new PriorityQueue((a, b) => a[1] > b[1]);
    this._grafo.push([userID, cola]);
    console.log("Se inserto sastisfactoriamente el usuario con id: "
        + (this._grafo[this._grafo.length - 1])[0]);
  }

  async conectar(idUsuarioA, idUsuarioB) {
    if (idUsuarioA != idUsuarioB) {
      var valorCompatibilidad =
          await compatibilidad.aplicarFunciones(idUsuarioA, idUsuarioB);
      console.log("Valor de compatibilidad: " + valorCompatibilidad);
      if (valorCompatibilidad > 0) {
        var indiceA = this._obtenerIndicePorIdUsuario(idUsuarioA);
        var indiceB = this._obtenerIndicePorIdUsuario(idUsuarioB);
        this._grafo[indiceA][1].push([idUsuarioB, valorCompatibilidad]);
        this._grafo[indiceB][1].push([idUsuarioA, valorCompatibilidad]);
        console.log("Se conecto: " + idUsuarioA + " con "
            + idUsuarioB);
      } else {
        console.log("No se conecto: " + idUsuarioA + " con "
            + idUsuarioB);
      }
    }
  }

  obtenerPareja(idUsuarioSolicitante) {
    var idUsuarioSolicitado = "";
    var indiceSolicitante =
        this._obtenerIndicePorIdUsuario(idUsuarioSolicitante);
    console.log('idUsuarioSolicitante: ', idUsuarioSolicitante);
    var colaLocal = this._grafo[indiceSolicitante][1];
    var encontrado = false;
    while (!(colaLocal.isEmpty() || encontrado)) {
      var parUsusarioValor = colaLocal.pop();
      if (parUsusarioValor[1] > 0) {
        idUsuarioSolicitado = parUsusarioValor[0];
        encontrado = true;
      }
    }
    return idUsuarioSolicitado;
  }

  _obtenerIndicePorIdUsuario(idUsuario) {
    return this._grafo.findIndex(i => i[0] == idUsuario);
  }
}

module.exports = Grafo;