const productRouter = require("express").Router();
const { upload } = require("../utils/uploads");
/**Product Routes */
const {
  newProduct,
  getAllProduct,
  getProduct,
  UpdateProduct,
  DeleteProduct,
  discount,
  featuredProduct,
  newArrivals,
  makeProduct,
  makeArrivals,
} = require("../controllers/productController");
productRouter.post("/create", upload.any("images"), newProduct);
productRouter.get("/getAll", getAllProduct);
productRouter.get("/get/:id", getProduct);
productRouter.get("/update/:id", upload.any("images"), UpdateProduct);
productRouter.delete("/delete/:id", DeleteProduct);
productRouter.patch("/discount/:productId", discount);
productRouter.get("/products/featured", featuredProduct);
productRouter.get("/products/new-arrivals", newArrivals);
productRouter.get("/update", makeProduct);
productRouter.get("/update/arrival", makeArrivals);

module.exports = { productRouter };
