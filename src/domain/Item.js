class Item {
    constructor({ name, description, price }) {
        if (!name || !description || !price) {
            throw new Error("Todos los campos son requeridos: name, description, price");
        }

        this.name = name;
        this.description = description;
        this.price = price;
    }
}

module.exports = Item;

    