const fs = require("fs");
//class ProductManager y static
class ProductManager {
  static prodManager = [];
//create con el array dentro
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
      console.log("Successfully created");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
//metodo read
  read(path) {
    try {
      if (fs.existsSync(path)) {
        const readFiles = JSON.parse(fs.readFileSync(path, "utf-8"));
        console.log(readFiles);
      } else {
        console.error("File not found:", path);
      }
    } catch (error) {
      console.error("Error reading file:", error);
    }
  }
//metodo read por id
  readOnId(id) {
    const foundProduct = ProductManager.prodManager.find(
      (product) => product.id === id
    );
    return foundProduct || null;
  }
}
//path del archivo json
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
console.log(manager.readOnId(2)); // console logs
