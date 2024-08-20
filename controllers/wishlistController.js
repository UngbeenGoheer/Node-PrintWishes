const { minusUserPrivateFields } = require("../constants");
const { My_WishList } = require("../models/wishlistModels");
const { trimObjects } = require("../utils/trimObjects");
/**Create wishList */
exports.newWishlist = async (req, res) => {
  try {
    trimObjects(req.body);

    const userId = req.params.userId;
    const { productId, isFavorite } = req.body;
    if (!userId && productId && isFavorite) {
      return res.status(400).json({
        success: false,
        message: "Not find any feild .",
      });
    }
    const myWishlist = await My_WishList.create({ ...req.body, userId });
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
    const wishlist = await My_WishList.find({ userId })
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
    if (!wishList) {
      return res.status(400).json({
        success: true,
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
// /**Updatelist */
// exports.updateList = async (req, res) => {
//   try {
//     const list = await My_WishList.findOne({
//       _id: req.params.id,
//       userId: id,
//       productId: id,
//     });
//     if (!list) {
//       return res.status(400).json({
//         success: false,
//         message: "wish List is empty.",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "List updated successfully.",
//       data: wishList,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };
/**Delete List */
exports.deleteList = async (req, res) => {
  try {
    const mylist = await My_WishList.findOneAndDelete({
      _id: req.params.id,
      userId: id,
      productId: id,
    });
    if (!mylist) {
      return res.status(400).json({
        success: false,
        message: "wish List is empty.",
      });
    }
    res.status(200).json({
      success: true,
      message: "List Deleted successfully.",
      data: wishList,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
