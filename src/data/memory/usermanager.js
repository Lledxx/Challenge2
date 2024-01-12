class UserManager {
    static users = [];

    create(data) {
        const user = {
            id: UserManager.users.length === 0
                ? 1
                : UserManager.users[UserManager.users.length - 1].id + 1,
            name: data.name,
            photo: data.photo,
            email: data.email,
           
        };
        UserManager.users.push(user);
        return user;
    }
    read() {
        return UserManager.users;
    }

    readOne(userId) {
        const user = UserManager.users.find(p => p.id === userId);
        return user || null;
    }
}
const users = new UserManager();

users.create({
    name: "producto numero 1",
    photo: "otra foto",
    email: "bessi434@gmail.com",
   
});

users.create({
    name: "producto numero 2",
    photo: "otra foto2",
    email : "joaquinlledox@outlook.com.ar",
});

//console log de UserManager
console.log(UserManager.users)

// console log de allUsers read
const allUsers = users.read();
console.log("Todos los usuarios:", allUsers);

//console log de userIdToRead
const userIdToRead = 1; 
const specificUser = users.readOne(userIdToRead);
console.log("Usuario específico:", specificUser);