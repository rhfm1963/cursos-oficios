const Curso = require('../models/Curso');
const Usuario = require('../models/Usuario');

exports.crearCurso = async (req, res) => {
  if (req.usuario.rol !== 'maestro') return res.status(403).json({ msg: 'Acceso denegado' });

  try {
    const { titulo, descripcion, fechaInicio, fechaFin, capacidad } = req.body;
    const curso = new Curso({
      titulo,
      descripcion,
      fechaInicio,
      fechaFin,
      capacidad,
      maestro: req.usuario.id
    });
    await curso.save();
    res.status(201).json(curso);
  } catch (err) {
    res.status(500).send('Error al crear el curso');
  }
};

exports.obtenerCursos = async (req, res) => {
  try {
    const cursos = await Curso.find({ activo: true }).populate('maestro', 'nombre especialidad');
    res.json(cursos);
  } catch (err) {
    res.status(500).send('Error al obtener cursos');
  }
};

exports.obtenerCursoPorId = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id).populate('maestro', 'nombre especialidad');
    if (!curso || !curso.activo) return res.status(404).json({ msg: 'Curso no encontrado' });
    res.json(curso);
  } catch (err) {
    res.status(500).send('Error al obtener curso');
  }
};

exports.actualizarCurso = async (req, res) => {
  if (req.usuario.rol !== 'maestro') return res.status(403).json({ msg: 'Acceso denegado' });

  try {
    let curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ msg: 'Curso no encontrado' });

    if (curso.maestro.toString() !== req.usuario.id) return res.status(403).json({ msg: 'Acceso denegado' });

    curso = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(curso);
  } catch (err) {
    res.status(500).send('Error al actualizar curso');
  }
};

exports.eliminarCurso = async (req, res) => {
  if (req.usuario.rol !== 'maestro') return res.status(403).json({ msg: 'Acceso denegado' });

  try {
    let curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ msg: 'Curso no encontrado' });

    if (curso.maestro.toString() !== req.usuario.id) return res.status(403).json({ msg: 'Acceso denegado' });

    curso.activo = false;
    await curso.save();
    res.json({ msg: 'Curso eliminado (desactivado)' });
  } catch (err) {
    res.status(500).send('Error al eliminar curso');
  }
};