const mongoose = require('mongoose');

const inscripcionSchema = new mongoose.Schema({
  curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
  estudiante: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fechaInscripcion: { type: Date, default: Date.now },
  asistencias: [
    {
      fecha: Date,
      presente: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Inscripcion', inscripcionSchema);