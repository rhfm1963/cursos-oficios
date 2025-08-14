const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  capacidad: { type: Number, required: true },
  maestro: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Curso', cursoSchema);