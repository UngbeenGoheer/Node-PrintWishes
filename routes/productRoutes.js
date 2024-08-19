const productRouter = require("express").Router();
const { upload } = require("../utils/uploads");
const { loginAuth } = require("../middleware/loginAuth");
/** Controllers */
const {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  discount,
  setProductFeatured,
  getAllFeaturedProducts,
  setProductNewArrival,
  getAllNewArrivalProducts,
} = require("../controllers/productController");

/** Routes */
productRouter.post("/create", loginAuth, upload.any("images"), createProduct);
productRouter.get("/getAll", getAllProduct);
productRouter.get("/get/:id", getProduct);
productRouter.get(
  "/update/:id",
  loginAuth,
  upload.any("images"),
  updateProduct
);
productRouter.delete("/delete/:id", loginAuth, deleteProduct);
productRouter.patch("/discount/:productId", loginAuth, discount);
productRouter.get("/setFeatured/:id", loginAuth, setProductFeatured);
productRouter.get("/getAll/featured", getAllFeaturedProducts);
productRouter.get("/setNewArrival/:id", loginAuth, setProductNewArrival);
productRouter.get("/getAll/newArrivals", getAllNewArrivalProducts);

module.exports = { productRouter };
