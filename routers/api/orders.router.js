import { Router } from "express";
import propsOrders from "../../src/middlewares/propsOrders.mid.js";
import ordersManager from "../../src/data/fs/orders.fs.manager.js";

const ordersRouter = Router();

// Definir los endpoints (POST GET PUT DELETE)

ordersRouter.post("/", propsOrders, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ordersManager.create(data);
    return res.json({
      statusCode: 201,
      message: "created",
      response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const all = await ordersManager.read();
    return res.json({
      statusCode: 201,
      message: "created",
      all,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:uid", (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = ordersManager.readByUser(uid);
    return res.json({
      success: true,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const newData = req.body;
    const updatedOrder = await ordersManager.update(oid, newData);
    return res.json({
      success: true,
      message: "Order updated successfully",
      response: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res) => {
  try {
    const { oid } = req.params;
    const updatedOrder = await ordersManager.destroy(oid);
    return res.json({
      success: true,
      message: "Order delete successfully",
      response: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;