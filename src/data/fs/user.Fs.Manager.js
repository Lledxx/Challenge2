import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserManager {
  constructor() {
    this.path2 = path.join(__dirname, "./files/user.fs.json");
    this.users2 = [];
  }

  async create(data) {
    const user = {
      id: crypto.randomBytes(12).toString("hex"),
      name: data.name,
      photo: data.photo,
      email: data.email,
    };
    this.users2.push(user);
    const jsonData = JSON.stringify(this.users2, null, 2);
    await fs.promises.writeFile(this.path2, jsonData);
    console.log("User created successfully");
  }

  async read() {
    try {
      const result = await fs.promises.readFile(this.path2, "utf-8");
      this.users2 = JSON.parse(result);
      console.log(this.users2);
      return this.users2;
    } catch (error) {
      console.log("Error reading the file");
    }
  }

  readOne(id) {
    try {
      const result = fs.readFileSync(this.path2, "utf-8");
      this.users2 = JSON.parse(result);
      const user = this.users2.find((each) => each.id === String(id));

      if (!user) {
        throw new Error("Don't exist user with ID " + id);
      } else console.log(user);
      return user;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const result = fs.readFileSync(this.path2, "utf-8");
      this.users2 = JSON.parse(result);
      let one = this.users2.find((each) => each.id === String(id));
      if (!one) {
        throw new Error("There isn't any user with id n° " + id);
      } else {
        this.users2 = this.users2.filter((each) => each.id !== String(id));
        const jsonData = JSON.stringify(this.users2, null, 2);
        await fs.promises.writeFile(this.path2, jsonData);
        return console.log("User " + id + " deleted successfully");
      }
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }

  async update(id, newData) {
    try {
      const result = await fs.promises.readFile(this.path2, "utf-8");
      this.users2 = JSON.parse(result);

      const userIndex = this.users2.findIndex(
        (each) => each.id === String(id)
      );

      if (userIndex === -1) {
        throw new Error("No user exists with ID " + id);
      }

      this.users2[userIndex] = {
        ...this.users2[userIndex],
        ...newData,
      };

      const jsonData = JSON.stringify(this.users2, null, 2);
      await fs.promises.writeFile(this.path2, jsonData);

      console.log("User updated successfully");
      console.log(this.users2[userIndex]);

      return this.users2[userIndex];
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }
}

const userManager = new UserManager("./main/src/data/fs/files/users.fs.json");
export default userManager;