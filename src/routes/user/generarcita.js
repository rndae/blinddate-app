const Place = require('../../models/place');
const Appointment = require('../../models/appointment');

exports.generarCita = (idApplicant, idRequested) => {
  return buscarLugar().then(async lugar => {
    let lugarDate = lugar.getLugar();
    let fechaDate = buscarHora(buscarFecha());
    const date = new Appointment({
      "idApplicant": idApplicant,
      "idRequested": idRequested,
      "place": lugarDate,
      "time": fechaDate,
    });
    await date.save();
    return date;
  }).then(response => response)
};

let buscarLugar = function () {
  return Place.find()
    .then(places => {
      if (places.length > 0) {
        let randomNumber = Math.floor(Math.random() * places.length);
        return Place.findOne().skip(randomNumber).then(response => response);
      } else {
        throw "no hay lugar";
      }
    }).then(response => response)
};

let buscarFecha = function () {
  let now = new Date();
  let randomNumber = Math.floor(Math.random() * (7 - 1)) + 1;
  let date = now.getDate() + randomNumber;
  now.setDate(date)
  let day = now.toDateString().slice(0, 3);
  if (day == "Sun") {
    date = now.getDate() + 1;
    now.setDate(date)
  }
  console.log('fecha: ' + now);
  return now;
};

let buscarHora = function (date) {
  let randomNumber = Math.floor(Math.random() * (20 - 8)) + 8;
  console.log('nueva hora: ' + randomNumber);
  date.setHours(randomNumber);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
};
