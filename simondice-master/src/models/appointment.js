const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = Schema({
  idApplicant: Number,
  idRequested: Number,
  place: String,
  time: Date,
  status1: {
    type: String,
    default: "null"
  },
  status2: {
    type: String,
    default: "null"
  }
});

let Appointment = mongoose.model("appointment", AppointmentSchema);
module.exports = Appointment;