// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Usuario = require('./models/Usuario');
const Curso = require('./models/Curso');
const Inscripcion = require('./models/Inscripcion');
const Valoracion = require('./models/Valoracion');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Limpiar colecciones
    await Usuario.deleteMany({});
    await Curso.deleteMany({});
    await Inscripcion.deleteMany({});
    await Valoracion.deleteMany({});

    console.log('✅ Colecciones limpiadas');

    // Crear usuarios
    const passwordHash = await bcrypt.hash('123456', 10);

    const maestro = new Usuario({
      nombre: 'Ana Pérez',
      email: 'ana@oficios.com',
      password: passwordHash,
      rol: 'maestro',
      especialidad: 'Costura y Moda'
    });
    await maestro.save();

    const estudiante1 = new Usuario({
      nombre: 'Carlos Ruiz',
      email: 'carlos@oficios.com',
      password: passwordHash,
      rol: 'estudiante'
    });
    await estudiante1.save();

    const estudiante2 = new Usuario({
      nombre: 'Luisa Gómez',
      email: 'luisa@oficios.com',
      password: passwordHash,
      rol: 'estudiante'
    });
    await estudiante2.save();

    console.log('✅ Usuarios creados');

    // Crear curso
    const curso = new Curso({
      titulo: 'Taller de Costura Básica',
      descripcion: 'Aprende a coser a mano y con máquina. Ideal para principiantes.',
      fechaInicio: new Date('2025-04-01'),
      fechaFin: new Date('2025-04-15'),
      capacidad: 10,
      maestro: maestro._id
    });
    await curso.save();

    console.log('✅ Curso creado');

    // Crear inscripción
    const inscripcion = new Inscripcion({
      curso: curso._id,
      estudiante: estudiante1._id,
      asistencias: [
        { fecha: new Date('2025-04-02'), presente: true },
        { fecha: new Date('2025-04-05'), presente: true }
      ]
    });
    await inscripcion.save();

    console.log('✅ Inscripción creada');

    // Crear valoración
    const valoracion = new Valoracion({
      curso: curso._id,
      emisor: estudiante1._id,
      receptor: maestro._id,
      calificacion: 5,
      comentario: 'Excelente maestra, muy clara y paciente.'
    });
    await valoracion.save();

    // Actualizar calificación promedio del maestro
    maestro.calificacionPromedio = 5;
    await maestro.save();

    console.log('✅ Valoración creada y promedio actualizado');

    console.log('🎉 Seed completado con éxito');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error en el seed:', err);
    mongoose.disconnect();
  }
}

seed();