import { Router } from "express";
import productManager from "../../src/data/fs/product.Fs.Manager.js";
import propsProducts from "../../src/middlewares/propsProducts.mid.js"

const ProductsRouter = Router();



ProductsRouter.post("/",propsProducts, async (req, res,next) => {
  try {
    const data = req.body;
    const response = await productManager.create(data);
    return res.json({
      statusCode: 201,
      message: "created",
      response,
    });
  } catch (error) {
   return next(error)
  }
});

ProductsRouter.get("/", async (req, res,next) => {
  try {
    const all = await productManager.read();
    return res.json({
      success: true,
      response: all,
    });
  } catch (error) {
    return next(error)
  }
});
ProductsRouter.get("/:pid", async (req, res,next) => {
  try {
    const { pid } = req.params;
    const one = productManager.readOne(pid);
    return res.json({
      success: true,
      response: one,
    });
  } catch (error) {
    return next(error)
  }
});


ProductsRouter.put("/:pid", propsProducts, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const updatedProduct = await productManager.update(pid, newData);
    return res.json({
      success: true,
      message: "Product updated successfully",
      response: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
});




ProductsRouter.delete("/:pid", async (req, res,next) => {

  try {
    const { pid } = req.params;
    const updatedOrder = await productManager.destroy(pid);
    return res.json({
      success: true,
      message: "Products delete successfully",
      response: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }


});

export default ProductsRouter;