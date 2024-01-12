import { Router } from "express";
import apiRouter from "./api/index.router.js";


const router = Router()

// implementar el router de API 
router.use("/api",apiRouter)
// implementar el router de vistas




export default router