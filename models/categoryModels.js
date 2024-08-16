const mongoose = require("mongoose");

const cetagorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", cetagorySchema);

module.exports = { Category };
