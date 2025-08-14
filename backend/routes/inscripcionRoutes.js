const express = require('express');
const auth = require('../middleware/authMiddleware');
const { inscribirse, obtenerInscripciones, marcarAsistencia } = require('../controllers/inscripcionController');

const router = express.Router();

router.post('/inscribir', auth, inscribirse);
router.get('/', auth, obtenerInscripciones);
router.post('/asistencia/:id', auth, marcarAsistencia);

module.exports = router;