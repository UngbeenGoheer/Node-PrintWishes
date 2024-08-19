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

    featuredProduct: {
      type: Boolean,
      default: false,
    },

    newArrival: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sliderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slider",
      required: true,
    },
  },
  { timestamps: true, collection: "Products" }
);
const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
