require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const inscripcionRoutes = require('./routes/inscripcionRoutes');
const valoracionRoutes = require('./routes/valoracionRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200' // Angular
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/valoraciones', valoracionRoutes);

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});