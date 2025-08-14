const express = require('express');
const auth = require('../middleware/authMiddleware');
const { crearCurso, obtenerCursos, obtenerCursoPorId, actualizarCurso, eliminarCurso } = require('../controllers/cursoController');

const router = express.Router();

router.post('/', auth, crearCurso);
router.get('/', obtenerCursos);
router.get('/:id', obtenerCursoPorId);
router.put('/:id', auth, actualizarCurso);
router.delete('/:id', auth, eliminarCurso);

module.exports = router;