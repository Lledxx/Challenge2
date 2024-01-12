import { Router } from "express";
import userManager from "../../src/data/fs/user.Fs.Manager.js";
import propsUsers from "../../src/middlewares/propsUsers.mid.js"




const usersRouter = Router()

// Definir los endpoints (POST GET PUT DELETE)

usersRouter.post("/",propsUsers, async (req,res,next)=>{

    try {
        const data = req.body;
        const response = await userManager.create(data);
        return res.json({
          statusCode: 201,
          message: "created",
          response,
        });
      } catch (error) {
       return next(error)
      }





})
usersRouter.get("/", async (req, res,next) => {
    try {
      const all = await userManager.read();
      return res.json({
        success: true,
        response: all,
      });
    } catch (error) {
      return next(error)
    }
  });

  usersRouter.get("/:uid", async (req, res,next) => {
    try {
      const { uid } = req.params;
      const one = userManager.readOne(uid);
      return res.json({
        success: true,
        response: one,
      });
    } catch (error) {
      return next(error)
    }
  });
  
  
  usersRouter.put("/:uid", propsUsers, async (req, res, next) => {
    try {
      const { uid } = req.params;
      const newData = req.body;
      const updateUser = await userManager.update(uid, newData);
      return res.json({
        success: true,
        message: "User updated successfully",
        response: updateUser,
      });
    } catch (error) {
      return next(error);
    }
  });
  
  
  
  
  usersRouter.delete("/:uid", async (req, res,next) => {
  
    try {
      const { uid } = req.params;
      const updatedOrder = await userManager.destroy(uid);
      return res.json({
        success: true,
        message: "Order delete successfully",
        response: updatedOrder,
      });
    } catch (error) {
      return next(error);
    }
  
  
  });



export default usersRouter