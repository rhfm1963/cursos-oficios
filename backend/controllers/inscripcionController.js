const Inscripcion = require('../models/Inscripcion');
const Curso = require('../models/Curso');

exports.inscribirse = async (req, res) => {
  if (req.usuario.rol !== 'estudiante') return res.status(403).json({ msg: 'Solo estudiantes pueden inscribirse' });

  try {
    const curso = await Curso.findById(req.body.cursoId);
    if (!curso) return res.status(404).json({ msg: 'Curso no encontrado' });

    const inscrito = await Inscripcion.findOne({ curso: curso._id, estudiante: req.usuario.id });
    if (inscrito) return res.status(400).json({ msg: 'Ya estás inscrito' });

    const inscripciones = await Inscripcion.countDocuments({ curso: curso._id });
    if (inscripciones >= curso.capacidad) return res.status(400).json({ msg: 'Curso lleno' });

    const inscripcion = new Inscripcion({
      curso: curso._id,
      estudiante: req.usuario.id
    });

    await inscripcion.save();
    res.status(201).json(inscripcion);
  } catch (err) {
    res.status(500).send('Error al inscribirse');
  }
};

exports.obtenerInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.find({ estudiante: req.usuario.id })
      .populate('curso', 'titulo descripcion fechaInicio fechaFin')
      .populate('estudiante', 'nombre');
    res.json(inscripciones);
  } catch (err) {
    res.status(500).send('Error al obtener inscripciones');
  }
};

// Simular asistencia (solo maestro puede marcar)
exports.marcarAsistencia = async (req, res) => {
  if (req.usuario.rol !== 'maestro') return res.status(403).json({ msg: 'Solo maestros pueden marcar asistencia' });

  try {
    const inscripcion = await Inscripcion.findById(req.params.id);
    if (!inscripcion) return res.status(404).json({ msg: 'Inscripción no encontrada' });

    const curso = await Curso.findById(inscripcion.curso);
    if (curso.maestro.toString() !== req.usuario.id) return res.status(403).json({ msg: 'No eres el maestro de este curso' });

    const fecha = new Date(req.body.fecha || Date.now());
    inscripcion.asistencias.push({ fecha, presente: true });
    await inscripcion.save();

    res.json({ msg: 'Asistencia marcada', inscripcion });
  } catch (err) {
    res.status(500).send('Error al marcar asistencia');
  }
};