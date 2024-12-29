const ItemModel = require('../models/items');

const itemRepository = {
    save: async (item) => {
        const newItem = new ItemModel(item);
        return await newItem.save();
    },
    getAll: async () => {
        return await ItemModel.find(); // Busca todos los documentos en la colección
    },
};

module.exports = itemRepository;
