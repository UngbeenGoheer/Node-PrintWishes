const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      requried: true,
    },

    email: {
      type: String,
      trim: true,
      requried: true,
    },
    message: {
      type: String,
      trim: true,
      requried: true,
    },
  },
  { timestamps: true }
);

const Contact_Us = mongoose.model("Contact_Us", ContactSchema);
module.exports = { Contact_Us };
