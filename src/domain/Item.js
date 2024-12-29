class Item{
    constructor({name, description, price}){
        if (!name || !description || !price){
            throw new Error("no esta todito");
        }

        this.name = name;
        this.description = description;
        this.price = price;
    }
}