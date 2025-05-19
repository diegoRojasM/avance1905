const mongoose = require('mongoose');

const rutaSchema = new mongoose.Schema({
  nombreRuta: {
    type: String,
    required: [true, 'El nombre de la ruta es obligatorio'],
  },
  puntos: [
    {
      monumento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Monumento',
        required: true,
      },
      orden: {
        type: Number,
        required: true,
      },
      tiempoEstimado: {
        type: Number, // minutos entre un punto y otro
        required: true,
      }
    }
  ],
  duracionEstimada: {
    type: Number, // duración total en minutos
    required: true,
  },
  preferencias: {
    type: [String], // ejemplo: ["histórico", "gastronómico"]
    default: [],
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: false, // opcional: para rutas guardadas por usuarios
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Ruta', rutaSchema);
