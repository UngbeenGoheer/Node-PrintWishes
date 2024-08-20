const { newReview, getProductReviews, getReviewById, updateReview, deleteReview } = require("../controllers/reviewController");
const { loginAuth } = require("../middleware/loginAuth");

const reviewRouter = require("express").Router();

reviewRouter.post("/create", loginAuth, newReview);
reviewRouter.get("/getAll",getProductReviews);
reviewRouter.get("/get/:id", getReviewById);
reviewRouter.get("/update/:id", loginAuth, updateReview);
reviewRouter.delete("/delete/:id", deleteReview);
module.exports = { reviewRouter };
