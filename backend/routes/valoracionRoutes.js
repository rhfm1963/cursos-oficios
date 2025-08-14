const express = require('express');
const auth = require('../middleware/authMiddleware');
const { crearValoracion, obtenerValoracionesPorCurso } = require('../controllers/valoracionController');

const router = express.Router();

router.post('/', auth, crearValoracion);
router.get('/curso/:cursoId', obtenerValoracionesPorCurso);

module.exports = router;