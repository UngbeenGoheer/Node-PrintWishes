const { minusUserPrivateFields } = require("../constants");
const { Review } = require("../models/reviewModels");

/**create */
exports.newReview = async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    const reviewProduct = await Review.create(req.body);
    if (!reviewProduct) {
      return res.status(400).json({
        success: true,
        message: "All feilds are necessary .",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Review Product.",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Get all reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    }).populate("userId");
    if (!reviews) {
      return res.status(400).json({
        success: true,
        message: "Not Found Any review.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched ALL reviews .",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "userId",
      minusUserPrivateFields
    );
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched A review.",
      data: review,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
/**update Review */
exports.updateReview = async (req, res) => {
  const { rating, comment } = req.body;

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid rating" });
  }
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      { new: true }
    ).populate("userId");
    if (!updatedReview) {
      return res
        .status(404)
        .json({ success: true, message: "Review not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      data: updatedReview,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
/**Delete reviews */
exports.deleteReview = async (req, res) => {
  try {
    const result = await Review.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: true,
        message: "Review not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
