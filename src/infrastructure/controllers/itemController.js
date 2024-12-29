const createItem = require('../../application/createItem');
const itemRepository = require('../repositories/itemRepository');

const itemController = {
    create: async (req, res) => {
        try {
            const newItem = await createItem(req.body, itemRepository);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

module.exports = itemController;
