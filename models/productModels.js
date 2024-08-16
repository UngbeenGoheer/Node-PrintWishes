const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      requried: true,
    },

    discription: {
      type: String,
      trim: true,
      requried: true,
    },

    priceBeforeDiscount: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    priceAfterDiscount: {
      type: Number,
      default: 0,
    },

    images: [
      {
        type: String,
      },
    ],
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featured_product: {
      type: Boolean,
      default: false,
    },
    product_new_arrival: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "Products" }
);
const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
