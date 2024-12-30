// Importamos el caso de uso para crear un item
const createItem = require('../../application/createItem');

// Importamos el repositorio que interactúa con la base de datos
const itemRepository = require('../repositories/itemRepository');

// Importamos mongoose para validar IDs y manejar datos de MongoDB
const mongoose = require('mongoose');

// Controlador que contiene las funciones para manejar las operaciones CRUD
const itemController = {
    // Función para crear un nuevo item
    create: async (req, res) => {
        try {
            // Llamamos al caso de uso `createItem` pasando los datos del body y el repositorio
            const newItem = await createItem(req.body, itemRepository);

            // Respondemos con el nuevo item creado y el código 201 (creado)
            res.status(201).json(newItem);
        } catch (error) {
            // Si ocurre un error, respondemos con el código 400 (solicitud incorrecta)
            res.status(400).json({ message: error.message });
        }
    },

    // Función para listar todos los items
    getAll: async (req, res) => {
        try {
            // Llamamos al repositorio para obtener todos los items de la base de datos
            const items = await itemRepository.getAll();

            // Respondemos con los items obtenidos y el código 200 (éxito)
            res.status(200).json(items);
        } catch (error) {
            // Si ocurre un error, respondemos con el código 500 (error interno del servidor)
            res.status(500).json({ message: error.message });
        }
    },

    // Función para obtener un item por su ID
    getById: async (req, res) => {
        try {
            // Obtenemos el ID de los parámetros de la URL
            const { id } = req.params;

            // Validamos si el ID tiene un formato válido
            if (!mongoose.isValidObjectId(id)) {
                // Si no es válido, respondemos con el código 400 (solicitud incorrecta)
                return res.status(400).json({ message: 'ID inválido' });
            }

            // Llamamos al repositorio para buscar el item por su ID
            const item = await itemRepository.getById(id);

            // Si no se encuentra el item, respondemos con el código 404 (no encontrado)
            if (!item) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }

            // Si el item existe, lo devolvemos con el código 200 (éxito)
            res.status(200).json(item);
        } catch (error) {
            // Si ocurre un error, respondemos con el código 500 (error interno del servidor)
            res.status(500).json({ message: error.message });
        }
    },

    // Función para actualizar un item por su ID
    update: async (req, res) => {
        try {
            // Obtenemos el ID de los parámetros de la URL
            const { id } = req.params;

            // Obtenemos los datos que se quieren actualizar del body
            const data = req.body;

            // Validamos si el ID tiene un formato válido
            if (!mongoose.isValidObjectId(id)) {
                // Si no es válido, respondemos con el código 400 (solicitud incorrecta)
                return res.status(400).json({ message: 'ID inválido' });
            }

            // Llamamos al repositorio para actualizar el item por su ID
            const updatedItem = await itemRepository.update(id, data);

            // Si el item no se encuentra, respondemos con el código 404 (no encontrado)
            if (!updatedItem) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }

            // Si la actualización es exitosa, devolvemos el item actualizado con el código 200 (éxito)
            res.status(200).json(updatedItem);
        } catch (error) {
            // Si ocurre un error, respondemos con el código 500 (error interno del servidor)
            res.status(500).json({ message: error.message });
        }
    },

    // Función para eliminar un item por su ID
    delete: async (req, res) => {
        try {
            // Obtenemos el ID de los parámetros de la URL
            const { id } = req.params;

            // Validamos si el ID tiene un formato válido
            if (!mongoose.isValidObjectId(id)) {
                // Si no es válido, respondemos con el código 400 (solicitud incorrecta)
                return res.status(400).json({ message: 'ID inválido' });
            }

            // Llamamos al repositorio para eliminar el item por su ID
            const deletedItem = await itemRepository.delete(id);

            // Si el item no se encuentra, respondemos con el código 404 (no encontrado)
            if (!deletedItem) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }

            // Si la eliminación es exitosa, respondemos con un mensaje y el código 200 (éxito)
            res.status(200).json({ message: 'Item eliminado correctamente' });
        } catch (error) {
            // Si ocurre un error, respondemos con el código 500 (error interno del servidor)
            res.status(500).json({ message: error.message });
        }
    },
};

// Exportamos el controlador para que pueda ser utilizado en las rutas
module.exports = itemController;
