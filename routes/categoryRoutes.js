const categoryRouter = require("express").Router();
const { upload } = require("../utils/uploads");
/**CATEGORY ROUTES */
const {
  newCategory,
  getAllCategory,
  getOnecategory,
  UpdateCategory,
  DeleteCategory,
} = require("../controllers/categoryControllers");

categoryRouter.post("/create", upload.any("images"), newCategory);
categoryRouter.get("/getAll", getAllCategory);
categoryRouter.get("/get/:id", getOnecategory);
categoryRouter.get("/update/:id", upload.any("images"), UpdateCategory);
categoryRouter.delete("/delete/:id", DeleteCategory);
module.exports = { categoryRouter };
