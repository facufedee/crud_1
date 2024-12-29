const Item = require('../domain/item');

const createItem = async (itemData, itemRepository) => {
    // Validar y construir la entidad
    const item = new Item(itemData);

    // Guardar el item usando el repositorio
    return await itemRepository.save(item);
};

module.exports = createItem;
