const Ruta = require('../models/ruta.model');

//Crear una nueva ruta
const crearRuta = async (req, res) => {
  try {
    const nuevaRuta = new Ruta(req.body);
    const rutaGuardada = await nuevaRuta.save();
    res.status(201).json(rutaGuardada);
  } catch (error) {
    console.error('Error al crear ruta:', error);
    res.status(500).json({ mensaje: 'Error al crear la ruta' });
  }
};






//Listar todas las rutas
const listarRutas = async (req, res) => {
  try {
    const rutas = await Ruta.find()
      .populate('puntos.monumento') // Trae los datos del monumento
      .populate('usuarioId', 'nombre correo'); // Si quieres traer nombre y correo del usuario
    res.json(rutas);
  } catch (error) {
    console.error('Error al listar rutas:', error);
    res.status(500).json({ mensaje: 'Error al listar las rutas' });
  }
};





//Obtener una ruta por ID
const obtenerRuta = async (req, res) => {
  try {
    const ruta = await Ruta.findById(req.params.id)
      .populate('puntos.monumento')
      .populate('usuarioId', 'nombre correo');

    if (!ruta) {
      return res.status(404).json({ mensaje: 'Ruta no encontrada' });
    }

    res.json(ruta);
  } catch (error) {
    console.error('Error al obtener ruta:', error);
    res.status(500).json({ mensaje: 'Error al obtener la ruta' });
  }
};






//Eliminar una ruta por ID
const eliminarRuta = async (req, res) => {
  try {
    const ruta = await Ruta.findByIdAndDelete(req.params.id);

    if (!ruta) {
      return res.status(404).json({ mensaje: 'Ruta no encontrada' });
    }

    res.json({ mensaje: 'Ruta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar ruta:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la ruta' });
  }
};

module.exports = {
  crearRuta,
  listarRutas,
  obtenerRuta,
  eliminarRuta,
};
