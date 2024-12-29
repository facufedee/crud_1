const ItemModel = require('../models/items');

const itemRepository = {
    save: async (item) => {
        const newItem = new ItemModel(item);
        return await newItem.save();
    },
};

module.exports = itemRepository;
