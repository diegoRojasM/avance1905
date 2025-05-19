const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Rutas base (las iremos creando después)
app.get('/', (req, res) => {
    res.send('API de GeoBicentenario funcionando');
});

// Aquí se agregarán las rutas reales luego:
app.use('/api/autenticacion', require('./routes/auth.routes')); 
app.use('/api/usuarios', require('./routes/user.routes'));
app.use('/api/monumentos', require('./routes/monument.routes'));
app.use('/api/historias', require('./routes/historia.routes'));
app.use('/api/rutas', require('./routes/ruta.routes'));

module.exports = app;
