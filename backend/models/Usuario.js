const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { 
    type: String, 
    enum: ['maestro', 'estudiante'], 
    required: true 
  },
  especialidad: { type: String }, // Solo para maestros
  calificacionPromedio: { type: Number, default: 0 } // Promedio de valoraciones
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Usuario', usuarioSchema);