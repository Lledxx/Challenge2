const fs = require("fs");
const crypto = require("crypto");
const { Console } = require("console");

class UserManager {
  static #Users = [];

  constructor(path) {
    this.path = path;
    this.init();
  }

  init() {
    const exists = fs.existsSync(this.path);
    console.log(exists);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      UserManager.#Users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }

  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, photo, and email are required");
      }

      const newUser = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };
      UserManager.#Users.push(newUser);

      await this.writeFile(); 
      console.log(newUser.id);
      return newUser;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  read() {
    try {
      if (UserManager.#Users.length === 0) {
        throw new Error("User not found");
      } else {
        Console.log(UserManager.#Users);
        return UserManager.#Users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readOne(id) {
    try {
      const user = UserManager.#Users.find((each) => each.id === id);
      if (user) {
        console.log(user);
        return user;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  destroy(id) {
    try {
      const remainingUsers = UserManager.#Users.filter((each) => each.id !== id);
      if (remainingUsers.length < UserManager.#Users.length) {
        fs.promises.writeFile(
          this.path,
          JSON.stringify(remainingUsers, null, 2)
        );
        console.log("The user has been deleted");
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async writeFile() {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(UserManager.#Users, null, 2)
    );
  }
}

const users = new UserManager("./data/fs/files/users.json");


users.create({
  name: "Example",
  photo: "Example.jpg",
  email: "Example@example.com",
});

async function userManager() {
  await users.read();
  await users.readOne("0102ae2873909d5408a43154");
  await users.destroy("0102ae2873909d5408a43154");
}

userManager();