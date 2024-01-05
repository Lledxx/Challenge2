import fs from 'fs';
import crypto from 'crypto';



class ProductManager {
  static #prodManager = [];

 
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        ProductManager.#prodManager = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Title, photo, price, and stock are required");
      } else {
        const newProduct = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };

        ProductManager.#prodManager.push(newProduct);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#prodManager, null, 2)
        );
        console.log(newProduct.id);
        return newProduct;
      }
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  read() {
    try {
      if (ProductManager.#prodManager.length === 0) {
        throw new Error("Product not found");
      } else {
        console.log(ProductManager.#prodManager);
        return ProductManager.#prodManager;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readOne(id) {
    try {
      const product = ProductManager.#prodManager.find(
        (each) => each.id === id
      );
      if (product) {
        console.log(product);
        return product;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const product = ProductManager.#prodManager.find(
        (each) => each.id === id
      );
      if (product) {
        ProductManager.#prodManager = ProductManager.#prodManager.filter(
          (each) => each.id !== id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#prodManager, null, 2)
        );
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
}

const products = new ProductManager("fs/data/files/products.fs.json");

products.create({
  title: "Product",
  photo: "Photo",
  price: 250,
  stock: 50,
});

export default products;