const createItem = require('../../application/createItem');
const itemRepository = require('../repositories/itemRepository');
const mongoose = require('mongoose');

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
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar el formato del ID
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ message: 'ID inválido' });
            }

            const item = await itemRepository.getById(id);

            if (!item) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }

            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;

            // Validar el formato del ID
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ message: 'ID inválido' });
            }
            // Intentar actualizar el item en la base de datos
            const updatedItem = await itemRepository.update(id, data);

            if (!updatedItem) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }

            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar el formato del ID
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ message: 'ID inválido' });
            }
            
            // Intentar eliminar el item en la base de datos
            const deletedItem = await itemRepository.delete(id);

            if (!deletedItem) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }

            res.status(200).json({ message: 'Item eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = itemController;
