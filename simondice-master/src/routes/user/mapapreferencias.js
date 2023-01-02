class MapaPreferencias {
  constructor(preferencias) {
    this._mapa = {};
    for (var i = 0; i < preferencias.length; i++) {
      this._mapa[preferencias[i]] = {};
    }
  }

  /** tipoPreferencia recibe, por ejemplo "Carrera". */
  insertarRegla(tipoPreferencia, preferenciaA, preferenciaB, valor) {
    if (this.existeRegla(tipoPreferencia, preferenciaA, preferenciaB)) {
      console.log("La regla ya existe");
    } else {
      if (!(this._preferenciaEstaDefinida(tipoPreferencia, preferenciaA))) {
        this._mapa[tipoPreferencia][preferenciaA] = {};
      }
      if (!(this._preferenciaEstaDefinida(tipoPreferencia, preferenciaB))) {
        this._mapa[tipoPreferencia][preferenciaB] = {};
      }
      this._mapa[tipoPreferencia][preferenciaA][preferenciaB] = valor;
      this._mapa[tipoPreferencia][preferenciaB][preferenciaA] = valor;
      console.log("regla ->"
        + this._mapa[tipoPreferencia][preferenciaA][preferenciaB]);
      console.log("regla ->"
        + this._mapa[tipoPreferencia][preferenciaB][preferenciaA]);
    }
  }

  _preferenciaEstaDefinida(tipoPreferencia, preferencia) {
    if (typeof this._mapa[tipoPreferencia][preferencia] !== "undefined") {
      return true;
    } else {
      return false;
    }
  }

  obtenerValorRegla(tipoPreferencia, preferenciaA, preferenciaB) {
    var valor = 0;
    if (this.existeRegla(tipoPreferencia, preferenciaA, preferenciaB)) {
      return this._mapa[tipoPreferencia][preferenciaA][preferenciaB];
    }
    return valor;
  }

  existeRegla(tipoPreferencia, preferenciaA, preferenciaB) {
    if (this._preferenciaEstaDefinida(tipoPreferencia, preferenciaA)
        && this._preferenciaEstaDefinida(tipoPreferencia, preferenciaB)) {
      if (this._mapa[tipoPreferencia][preferenciaA][preferenciaB]) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  eliminarRegla(tipoPreferencia, preferenciaA, preferenciaB, next) {
    this._mapa[tipoPreferencia][preferenciaA][preferenciaB] = undefined;
    this._mapa[tipoPreferencia][preferenciaB][preferenciaA] = undefined;
    console.log('regla: ', preferenciaA, ', ', preferenciaB, 'ELIMINADA');
    next();
  }

}

module.exports = MapaPreferencias;