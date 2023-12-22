const fs = require("fs");

class ProductManager {
  static prodManager = [];

  create(data) {
    const Products = {
      id:
        ProductManager.prodManager.length === 0
          ? 1
          : ProductManager.prodManager[
              ProductManager.prodManager.length - 1
            ].id + 1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock || null,
    };
    ProductManager.prodManager.push(Products);
  }

  pathData(path) {
    try {
      const jsonData = JSON.stringify(
        ProductManager.prodManager,
        null,
        2
      );
      fs.writeFileSync(path, jsonData, "utf-8");
      console.log("Successfully create");
    } catch (error) {
      console.error("An error has ocurred:", error);
    }
  }

  read(path) {
    try {
      const readFiles = JSON.parse(fs.readFileSync(path, "utf-8"));
      console.log(readFiles);
    } catch (error) {
      console.error("Not found Products!:", error);
    }
  }

  readOnId(id) {
    const foundProduct = ProductManager.prodManager.find(
      (product) => product.id === id
    );
    return foundProduct || null;
  }
}

const path = "./fs/data/files/products.fs.json";


const manager = new ProductManager();
manager.create({
  title: "title",
  photo: "photo",
  price: 250,
  stock: 50,
});
manager.create({
  title: "title2",
  photo: "photo2",
  price: 150,
  stock: 15,
});

manager.pathData(path);
manager.read(path);
console.log(manager.readOnId(2));
