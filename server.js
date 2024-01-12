import express from "express";
import productManager from "./src/data/fs/product.Fs.Manager.js";
import userManager from "./src/data/fs/user.Fs.Manager.js";
import router from "./routers/index.routers.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";

const server = express();
const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);
server.listen(PORT, ready);
//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname+'/public'))
server.use(morgan("dev"))
// Estas tres lineas van siempre al final
server.use("/", router);
server.use(errorHandler)
server.use(pathHandler)
