const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const itemRoutes = require('./src/infrastructure/routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/items', itemRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI) // No necesitas pasar las opciones obsoletas
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch((error) => console.log('Error al conectar con MongoDB:', error));
