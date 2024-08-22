const wishListRouter = require("express").Router();
const { loginAuth } = require("../middleware/loginAuth");
const {
  newWishlist,
  allList,
  singleWishlist,
  //updateList,
  deleteList,
} = require("../controllers/wishlistController");

wishListRouter.post("/create", loginAuth, newWishlist);
wishListRouter.get("/getAll", loginAuth, allList);
wishListRouter.get("/get/:id", loginAuth, singleWishlist);
//wishListRouter.get("/update/:id", loginAuth, updateList);
wishListRouter.delete("/delete/:id", loginAuth, deleteList);

module.exports = { wishListRouter };
