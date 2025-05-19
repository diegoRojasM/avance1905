const express = require('express');
const router = express.Router();
const {
  crearRuta,
  listarRutas,
  obtenerRuta,
  eliminarRuta
} = require('../controllers/ruta.controller');

//Crear una nueva ruta
router.post('/', crearRuta);
//Listar todas las rutas
router.get('/', listarRutas);
//Obtener una ruta por ID
router.get('/:id', obtenerRuta);
//Eliminar una ruta por ID
router.delete('/:id', eliminarRuta);


module.exports = router;
