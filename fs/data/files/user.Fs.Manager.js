const fs = require("fs");

class UserManager {
  static userManager = [];

  create(data) {
    const Users = {
      id:
        UserManager.userManager.length === 0
          ? 1
          : UserManager.userManager[
              UserManager.userManager.length - 1
            ].id + 1,
      title: data.title,
      photo: data.photo,
      email : data.email,
    };
    UserManager.userManager.push(Users);
  }

  pathData(path) {
    try {
      const jsonData = JSON.stringify(
        UserManager.userManager,
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
    const foundUser = UserManager.userManager.find(
      (user) => user.id === id
    );
    return foundUser || null;
  }
}

const path = "./fs/data/files/user.fs.json";


const manager = new UserManager();
manager.create({
  name: "title",
  photo: "photo",
  email: "example@example.com"
});
manager.create({
  name: "title2",
  photo: "photo2",
  email: "example@example.com"
});

manager.pathData(path);
manager.read(path);
console.log(manager.readOnId(2));