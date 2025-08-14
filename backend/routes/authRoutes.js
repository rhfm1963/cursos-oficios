const express = require('express');
const { body } = require('express-validator');
const { registrar, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', [
  body('nombre', 'Nombre es obligatorio').not().isEmpty(),
  body('email', 'Email válido es obligatorio').isEmail(),
  body('password', 'Contraseña de al menos 6 caracteres').isLength({ min: 6 }),
  body('rol', 'Rol requerido').isIn(['maestro', 'estudiante'])
], registrar);

router.post('/login', [
  body('email', 'Email válido es obligatorio').isEmail(),
  body('password', 'Contraseña es obligatoria').exists()
], login);

module.exports = router;