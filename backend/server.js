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
  origin: 'http://localhost:4200', // ✅ Permitir Angular
  credentials: true
}));
app.use(express.json());

// Documentación de la API - Punto de entrada
app.get("/", (req, res) => {
  res.json({
    status: "API funcionando correctamente",
    proyecto: "Plataforma de Cursos de Oficios Comunitarios",
    comunidad: "La Candelaria, Los Teques",
    descripcion: "API REST para gestionar talleres comunitarios, inscripciones, asistencia y valoraciones entre vecinos con talentos.",
    version: "1.0.0",
    endpoints: {
      autenticacion: {
        descripcion: "Gestión de usuarios: maestros y estudiantes",
        registrar: {
          metodo: "POST",
          ruta: "/api/auth/register",
          body: {
            nombre: "string",
            email: "string",
            password: "string (min 6 caracteres)",
            rol: "string ('maestro' o 'estudiante')",
            especialidad: "string (opcional, solo para maestros)"
          },
          ejemplo: {
            nombre: "Ana Pérez",
            email: "ana@oficios.com",
            password: "123456",
            rol: "maestro",
            especialidad: "Costura y Moda"
          }
        },
        login: {
          metodo: "POST",
          ruta: "/api/auth/login",
          descripcion: "Obtiene un token JWT válido por 7 días",
          body: {
            email: "string",
            password: "string"
          }
        }
      },
      cursos: {
        descripcion: "Gestión de talleres ofertados por maestros comunitarios",
        listar: {
          metodo: "GET",
          ruta: "/api/cursos",
          descripcion: "Obtiene todos los cursos activos con información del maestro"
        },
        detalle: {
          metodo: "GET",
          ruta: "/api/cursos/:id",
          descripcion: "Obtiene un curso específico por ID"
        },
        crear: {
          metodo: "POST",
          ruta: "/api/cursos",
          descripcion: "Solo maestros pueden crear cursos",
          autorizacion: "Requiere JWT y rol 'maestro'",
          body: {
            titulo: "string",
            descripcion: "string",
            fechaInicio: "Date",
            fechaFin: "Date",
            capacidad: "number"
          }
        },
        actualizar: {
          metodo: "PUT",
          ruta: "/api/cursos/:id",
          descripcion: "Actualiza un curso propio",
          autorizacion: "Solo el maestro creador puede editar"
        },
        eliminar: {
          metodo: "DELETE",
          ruta: "/api/cursos/:id",
          descripcion: "Desactiva un curso (no eliminación física)",
          autorizacion: "Solo el maestro creador puede desactivar"
        }
      },
      inscripciones: {
        descripcion: "Gestión de inscripciones de estudiantes a cursos",
        inscribirse: {
          metodo: "POST",
          ruta: "/api/inscripciones/inscribir",
          descripcion: "Permite a un estudiante inscribirse en un curso disponible",
          autorizacion: "Requiere JWT y rol 'estudiante'",
          body: {
            cursoId: "string (ID del curso)"
          }
        },
        misInscripciones: {
          metodo: "GET",
          ruta: "/api/inscripciones",
          descripcion: "Lista todas las inscripciones del usuario autenticado",
          autorizacion: "Requiere JWT"
        },
        marcarAsistencia: {
          metodo: "POST",
          ruta: "/api/inscripciones/asistencia/:id",
          descripcion: "Simula el registro de asistencia (solo maestro del curso)",
          autorizacion: "Requiere JWT y verificación de rol/maestro",
          body: {
            fecha: "Date (opcional, por defecto hoy)"
          }
        }
      },
      valoraciones: {
        descripcion: "Sistema de reputación comunitaria mediante valoraciones",
        crear: {
          metodo: "POST",
          ruta: "/api/valoraciones",
          descripcion: "Deja una valoración pública tras completar un curso",
          autorizacion: "Estudiante inscrito puede valorar una sola vez",
          body: {
            cursoId: "string",
            calificacion: "number (1-5)",
            comentario: "string (opcional)"
          }
        },
        porCurso: {
          metodo: "GET",
          ruta: "/api/valoraciones/curso/:cursoId",
          descripcion: "Obtiene todas las valoraciones de un curso específico"
        }
      },
      informacion: {
        nota: "Todos los endpoints que requieren autenticación deben incluir en el header:",
        ejemploHeader: {
          "x-auth-token": "tu_token_jwt_aqui"
        },
        seguridad: "La contraseña se encripta con bcrypt. El acceso está controlado por JWT.",
        estado: "Esta API cumple con el MVP del caso 8: Gestión de Cursos, Inscripción, Asistencia y Valoración."
      }
    },
    contacto: {
      proyecto: "Bootcamp Virtual Intensivo: Sprint de Desarrollo Sociotecnológico Ágil",
      comunidad: "La Candelaria, Los Teques",
      objetivo: "Fortalecer la cohesión social y el emprendimiento local mediante la educación comunitaria."
    }
  });
});

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