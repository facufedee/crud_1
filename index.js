// Importamos Express, un framework para crear aplicaciones web en Node.js
const express = require('express');

// Importamos Mongoose, una biblioteca para interactuar con MongoDB
const mongoose = require('mongoose');

// Cargamos las variables de entorno desde el archivo .env usando dotenv
require('dotenv').config();

// Importamos las rutas definidas para los items desde su archivo correspondiente
const itemRoutes = require('./src/infrastructure/routes/itemRoutes');

// Creamos una instancia de la aplicación Express
const app = express();

// Definimos el puerto del servidor. Usamos el valor de la variable de entorno PORT, o 5000 si no está definida
const PORT = process.env.PORT || 5000;

// ---------------- MIDDLEWARES ---------------- //

// Middleware para interpretar las solicitudes con cuerpo en formato JSON
app.use(express.json());

// ---------------- RUTAS ---------------- //

// Asociamos las rutas de los items a la URL base '/api/items'
app.use('/api/items', itemRoutes);

// ---------------- CONEXIÓN A MONGODB ---------------- //

// Conectamos a la base de datos MongoDB usando la URI definida en el archivo .env
mongoose
  .connect(process.env.MONGO_URI) // La URI está definida en el archivo .env como MONGO_URI
  .then(() => {
    // Si la conexión es exitosa, iniciamos el servidor en el puerto definido
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch((error) => {
    // Si ocurre un error al conectar con la base de datos, lo mostramos en la consola
    console.log('Error al conectar con MongoDB:', error);
  });