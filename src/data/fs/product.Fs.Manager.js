import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {

  init() {
    try {
      const exists = fs.existsSync(this.path2);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path2, data);
      } else {
        this.products = JSON.parse(fs.readFileSync(this.path2, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  constructor() {
    this.path2 = path.join(__dirname, "./files/products.fs.json");
    this.products2 = [];
    this.init();
  }

  async create(data) {
    const product = {
      id: crypto.randomBytes(12).toString("hex"),
      title: data.title,
      photo: data.photo,
      price: data.price,
    };

    this.products2.push(product);
    const jsonData = JSON.stringify(this.products2, null, 2);
    await fs.promises.writeFile(this.path2, jsonData);
    console.log("Product created successfully");
  }

  async read() {
    try {
      const result = await fs.promises.readFile(this.path2, "utf-8");
      this.products2 = JSON.parse(result);
      console.log(this.products2);
      return this.products2;
    } catch (error) {
      console.log("Error reading the file");
    }
  }

  readOne(id) {
    try {
      const result = fs.readFileSync(this.path2, "utf-8");
      this.products2 = JSON.parse(result);
      const product = this.products.find((each) => each.id === String(id));

      if (!product) {
        throw new Error("Don't exist product with ID " + id);
      } else console.log(product);
      return product;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const result = fs.readFileSync(this.path2, "utf-8");
      this.products2 = JSON.parse(result);
      let one = this.products2.find((each) => each.id === String(id));
      if (!one) {
        throw new Error("There isn't any product with id n° " + id);
      } else {
        this.products2 = this.products2.filter(
          (each) => each.id !== String(id)
        );
        const jsonData = JSON.stringify(this.products2, null, 2);
        await fs.promises.writeFile(this.path2, jsonData);
        return console.log("Product " + id + " deleted successfully");
      }
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }

  async update(id, newData) {
    try {
      const result = await fs.promises.readFile(this.path2, "utf-8");
      this.products = JSON.parse(result);
  
      const productIndex = this.products.findIndex(
        (each) => each.id === String(id)
      );
  
      if (productIndex === -1) {
        throw new Error("No product exists with ID " + id);
      }
  
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...newData,
      };
  
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path2, jsonData);
  
      console.log("Product updated successfully");
      console.log(this.products[productIndex]);
  
      return this.products[productIndex];
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }
}


const productManager = new ProductManager(
  "./main/src/data/fs/files/products.fs.json"
);
export default productManager;