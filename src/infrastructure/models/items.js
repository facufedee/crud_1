const mongoose = require('mongoose');

const ItemModel = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }, // Debe ser "description", no "descripcion"
    price: { type: Number, required: true } // Debe ser "price", no "Price"
});

module.exports = mongoose.model('Item', ItemModel);
    