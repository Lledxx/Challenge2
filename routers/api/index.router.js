import { Router } from "express";
import ProductsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";

const apiRouter = Router();

// enrutadores de los recursos
apiRouter.use("/products",ProductsRouter)
apiRouter.use("/users",usersRouter)
apiRouter.use("/orders",ordersRouter)



export default apiRouter;