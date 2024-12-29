const createItem = require('../../application/createItem');
const itemRepository = require('../repositories/itemRepository');

const itemController = {
         // Función para crear los items
    create: async (req, res) => {
        try {
            const newItem = await createItem(req.body, itemRepository);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
     // Función para listar todos los items
     getAll: async (req, res) => {
        try {
            // Llamamos al repositorio para obtener todos los items
            const items = await itemRepository.getAll();
            res.status(200).json(items); // Devolvemos los items en formato JSON
        } catch (error) {
            res.status(500).json({ message: error.message }); // Manejo de errores
        }
    }
};

module.exports = itemController;
