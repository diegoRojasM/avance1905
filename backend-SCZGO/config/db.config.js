const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,                        // TLS activo
      tlsAllowInvalidCertificates: true // Permitimos certificados locales
    });
    console.log('Conectado a MongoDB Atlas correctamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = conectarDB;
