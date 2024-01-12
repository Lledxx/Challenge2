import fs from "fs";
import crypto from "crypto";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class OrdersManager {

  init() {
    try {
      const exists = fs.existsSync(this.path2);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path2, data);
      } else {
        this.orders = JSON.parse(fs.readFileSync(this.path2, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  constructor() {
    this.path2 = path.join(__dirname, "./files/orders.fs.json");
    this.orders = [];
    this.init();
    console.log(this.orders);
  }

  async create(data) {
    const order = {
      oid: crypto.randomBytes(12).toString("hex"),
      pid: data.pid,
      uid: data.uid,
      quantity: data.quantity,
      state: data.state
    };

    this.orders.push(order);
    const jsonData = JSON.stringify(this.orders, null, 2);
    await fs.promises.writeFile(this.path2, jsonData);
    console.log("Order created successfully");
    console.log(this.orders);
  }

  async read() {
    try {
      const result = await fs.promises.readFile(this.path2, "utf-8");
      this.orders = JSON.parse(result);
      console.log(this.orders);
      return this.orders;
    } catch (error) {
      console.log("Error reading the file");
    }
  }

  readByUser(uid) {
    try {
      const result = fs.readFileSync(this.path2, "utf-8");
      this.orders = JSON.parse(result);
      const order = this.orders.filter((each) => each.uid === String(uid));

      if (!order) {
        throw new Error("Don't exist Order with User " + uid);
      } else console.log(order);
      return order;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async update(oid, newData) {
    try {
      const result = await fs.promises.readFile(this.path2, "utf-8");
      this.orders = JSON.parse(result);
  
      const orderIndex = this.orders.findIndex((each) => each.oid === String(oid));
  
      if (orderIndex === -1) {
        throw new Error("No order exists with ID " + oid);
      }
  
  
      this.orders[orderIndex] = {
        ...this.orders[orderIndex],
        ...newData
      };
  
     
      const jsonData = JSON.stringify(this.orders, null, 2);
      await fs.promises.writeFile(this.path2, jsonData);
  
      console.log("Order updated successfully");
      console.log(this.orders[orderIndex]);
  
      return this.orders[orderIndex];
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }

  async destroy(oid) {
    try {
      const result = fs.readFileSync(this.path2, "utf-8");
      this.orders = JSON.parse(result);
      let one = this.orders.find((each) => each.oid === String(oid));
      if (!one) {
        throw new Error("There isn't any order with id n° " + oid);
      } else {
        this.orders = this.orders.filter(
          (each) => each.oid !== String(oid)
        );
        const jsonData = JSON.stringify(this.orders, null, 2);
        await fs.promises.writeFile(this.path2, jsonData);
        return console.log("Order " + oid + " deleted successfully");
      }
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }
}
const ordersManager = new OrdersManager(
    "./main/src/data/files/orders.fs.json"

  );
  export default ordersManager;
  