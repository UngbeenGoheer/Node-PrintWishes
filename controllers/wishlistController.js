const { minusUserPrivateFields } = require("../constants");
const { My_WishList } = require("../models/wishlistModels");
const { trimObjects } = require("../utils/trimObjects");
/**Create wishList */
exports.newWishlist = async (req, res) => {
  try {
    trimObjects(req.body);

    const userId = req.params.userId;
    const { productId } = req.body;
    if (!userId && productId) {
      return res.status(400).json({
        success: false,
        message: "Not find any feild .",
      });
    }
    const myWishlist = await My_WishList.create(req.body);
    res.status(201).json({
      success: true,
      message: "Wishlist created successfully.",
      data: myWishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**getAll */
exports.allList = async (req, res) => {
  try {
    const wishlist = await My_WishList.find({})
      .populate("User", minusUserPrivateFields)
      .populate("Product");
    if (wishlist.length === 0) {
      return res.status(400).json({
        success: false,
        message: "wish List is empty.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Collection fetched successfully.",
      data: wishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
/**Get one */
exports.singleWishlist = async (req, res) => {
  try {
    const wishList = await My_WishList.findById(req.params.id)
      .populate("User", minusUserPrivateFields)
      .populate("Product");
    if (wishList.length === 0) {
      return res.status(400).json({
        success: false,
        message: "wish List is empty.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Collection fetched successfully.",
      data: wishList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
