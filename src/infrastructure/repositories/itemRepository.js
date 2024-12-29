const ItemModel = require('../models/items');

const itemRepository = {
    save: async (item) => {
        const newItem = new ItemModel(item);
        return await newItem.save();
    },
    getAll: async () => {
        return await ItemModel.find(); // Busca todos los documentos en la colección
    },
    // Obtener un item por su ID
    getById: async (id) => {
        return await ItemModel.findById(id); // Busca un documento por su ID
    },
    update: async (id, data) => {
        // { new: true } devuelve el documento actualizado
        return await ItemModel.findByIdAndUpdate(id, data, { new: true });
    },
    delete: async (id) => {
        // Eliminar un item por su ID
        return await ItemModel.findByIdAndDelete(id); // Elimina el documento por su ID
    },
};

module.exports = itemRepository;
