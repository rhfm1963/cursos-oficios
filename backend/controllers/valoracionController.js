const Valoracion = require('../models/Valoracion');
const Curso = require('../models/Curso');
const Usuario = require('../models/Usuario');

exports.crearValoracion = async (req, res) => {
  const { cursoId, calificacion, comentario } = req.body;

  try {
    const curso = await Curso.findById(cursoId);
    if (!curso) return res.status(404).json({ msg: 'Curso no encontrado' });

    const inscrito = await Inscripcion.findOne({ curso: cursoId, estudiante: req.usuario.id });
    if (!inscrito) return res.status(403).json({ msg: 'Debes estar inscrito para valorar' });

    const yaValorado = await Valoracion.findOne({ curso: cursoId, emisor: req.usuario.id });
    if (yaValorado) return res.status(400).json({ msg: 'Ya valoraste este curso' });

    const valoracion = new Valoracion({
      curso: cursoId,
      emisor: req.usuario.id,
      receptor: curso.maestro,
      calificacion,
      comentario
    });

    await valoracion.save();

    // Actualizar calificación promedio del maestro
    const valoraciones = await Valoracion.find({ receptor: curso.maestro });
    const promedio = valoraciones.reduce((acc, v) => acc + v.calificacion, 0) / valoraciones.length;
    await Usuario.findByIdAndUpdate(curso.maestro, { calificacionPromedio: promedio });

    res.status(201).json(valoracion);
  } catch (err) {
    res.status(500).send('Error al crear valoración');
  }
};

exports.obtenerValoracionesPorCurso = async (req, res) => {
  try {
    const valoraciones = await Valoracion.find({ curso: req.params.cursoId })
      .populate('emisor', 'nombre')
      .populate('receptor', 'nombre');
    res.json(valoraciones);
  } catch (err) {
    res.status(500).send('Error al obtener valoraciones');
  }
};