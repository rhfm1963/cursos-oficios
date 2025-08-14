const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

// Registro
exports.registrar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

  const { nombre, email, password, rol, especialidad } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) return res.status(400).json({ msg: 'El usuario ya existe' });

    usuario = new Usuario({ nombre, email, password, rol, especialidad });
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    await usuario.save();

    const payload = { usuario: { id: usuario.id, rol: usuario.rol } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, usuario: { id: usuario.id, nombre, email, rol, especialidad } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const payload = { usuario: { id: usuario.id, rol: usuario.rol } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email, rol: usuario.rol, especialidad: usuario.especialidad } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};