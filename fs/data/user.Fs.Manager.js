import fs from 'fs';
import crypto from 'crypto';
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserManager {
  static #userManager = [];

  init() {
    try {
      const exists = fs.existsSync(this.path2);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path2, data);
        UserManager.#userManager = [];
      } else {
        const fileContent = fs.readFileSync(this.path2, 'utf-8');
        console.log('File content:', fileContent);
        UserManager.#userManager = fileContent ? JSON.parse(fileContent) : [];
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  constructor() {
    this.path2 = path.join(__dirname, "./files/user.fs.json");
    this.init();
  }

  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error('Name, photo, and email are required');
      } else {
        const newUser = {
          id: crypto.randomBytes(12).toString('hex'),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };

        UserManager.#userManager.push(newUser);

        await fs.promises.writeFile(
          this.path2,
          JSON.stringify(UserManager.#userManager, null, 2)
        );
        console.log(newUser.id);
        return newUser;
      }
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
  }

  read() {
    try {
      if (UserManager.#userManager.length === 0) {
        throw new Error('User not found');
      } else {
        console.log(UserManager.#userManager);
        return UserManager.#userManager;
      }
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    }
  }

   readOne(id) {
    try {
      const user = UserManager.#userManager.find((each) => each.id === id);
      if (user) {
        console.log(user);
        return user;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    }
  }

  async destroy(id) {
    try {
      const user = UserManager.#userManager.find((each) => each.id === id);
      if (user) {
        UserManager.#userManager = UserManager.#userManager.filter(
          (each) => each.id !== id
        );
        await fs.promises.writeFile(
          this.path2,
          JSON.stringify(UserManager.#userManager, null, 2)
        );
        console.log('User has been deleted');
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
      return { error: error.message };
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(this.path2, 'utf-8');
      console.log('File content:', data);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from file:', error.message);
      return [];
    }
  }
}

const users = new UserManager('fs/data/files/user.fs.json');


export default users;