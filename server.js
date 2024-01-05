import express from "express";
import products from "./fs/data/product.Fs.Manager.js";
import users from "./fs/data/user.Fs.Manager.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

//const productManager = products;
//productManager.init();

//const userManager = users;
//userManager.init();


server.use(express.urlencoded({ extended: true }));

// Endpoint para obtener todos los productos
server.get("/api/products", (req, res) => {
  try {
    const all = products.read();
    if (Array.isArray(all)) {
      return res.status(200).json({
        success: true,
        response: all,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", (req, res) => {
  const { pid } = req.params;

  try {
    const product = products.readOne(pid);

    if (product) {
      return res.status(200).json({
        success: true,
        response: product,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Not found!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Endpoint para obtener todos los usuarios
server.get("/api/users", (req, res) => {
  try {
    const allUsers = users.read();
    if (Array.isArray(allUsers)) {
      return res.status(200).json({
        success: true,
        response: allUsers,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: allUsers,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Endpoint para obtener un usuario por ID
server.get("/api/users/:uid", (req, res) => {
  const { uid } = req.params;

  try {
    const user = users.readOne(uid);

    if (user) {
      return res.status(200).json({
        success: true,
        response: user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



server.listen(PORT, ready);