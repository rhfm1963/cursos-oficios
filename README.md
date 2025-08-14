# cursos-oficios
Caso Nª 8 - Cursos Oficios Comunitarios - BootCamp Intensivo UNETI PST3-M2 AGOSTO 2.025
Diseño Estructura del Backend
cursos-oficios-backend/
│
├── controllers/
│   ├── authController.js
│   ├── cursoController.js
│   ├── inscripcionController.js
│   └── valoracionController.js
│
├── models/
│   ├── Usuario.js
│   ├── Curso.js
│   ├── Inscripcion.js
│   └── Valoracion.js
│
├── routes/
│   ├── authRoutes.js
│   ├── cursoRoutes.js
│   ├── inscripcionRoutes.js
│   └── valoracionRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── .env
├── server.js
└── package.json

cursos-oficios-frontend/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   ├── usuario.model.ts
│   │   │   ├── curso.model.ts
│   │   │   ├── inscripcion.model.ts
│   │   │   └── valoracion.model.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── curso.service.ts
│   │   │   ├── inscripcion.service.ts
│   │   │   └── valoracion.service.ts
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── cursos-list/
│   │   │   ├── curso-detail/
│   │   │   ├── crear-curso/
│   │   │   ├── mis-cursos/
│   │   │   ├── valoracion-form/
│   │   │   └── navbar/
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── environments/
│   │   ├── environment.ts         // localhost:3000
│   │   └── environment.prod.ts    // https://cursos-oficios.onrender.com
│   └── ...
