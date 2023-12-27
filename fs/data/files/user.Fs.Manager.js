const fs = require("fs");
//class UserManager y static
class UserManager {
  static userManager = [];
//create con array data dentro
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
      email: data.email,
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
      console.log("Successfully created");
    } catch (error) {
      console.error("An error has occurred:", error);
    }
  }
//metodo read
  read(path) {
    try {
      const readFiles = JSON.parse(fs.readFileSync(path, "utf-8"));
      console.log(readFiles);
    } catch (error) {
      console.error("Not found Users!:", error);
    }
  }
// metodo read por id
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
  title: "title", 
  photo: "photo",
  email: "example@example.com",
});
manager.create({
  title: "title2",
  photo: "photo2",
  email: "example@example.com",
});

manager.pathData(path);
manager.read(path);
console.log(manager.readOnId(2));