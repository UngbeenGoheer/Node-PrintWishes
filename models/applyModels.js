const mongoose = require("mongoose");
const applySchema = new mongoose.Schema(
  {
    Your_Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Phone_Number: {
      type: Number,
      required: true,
    },
    Postition_Applied_for: {
      type: String,
      enum: [
        " Node Js Developer",
        "React Developer",
        "UI Designer",
        "UI/UX Designer",
      ],
      default: "",
    },
    Choosefile: {
      type: String,
    },
  },
  { timestamps: true }
);
const Apply_now = mongoose.model("Apply_now", applySchema);

module.exports = { Apply_now };
