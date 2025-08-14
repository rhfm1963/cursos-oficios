const mongoose = require('mongoose');

const valoracionSchema = new mongoose.Schema({
  curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
  emisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Quien da la valoración
  receptor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Maestro evaluado
  calificacion: { type: Number, required: true, min: 1, max: 5 },
  comentario: { type: String },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Valoracion', valoracionSchema);