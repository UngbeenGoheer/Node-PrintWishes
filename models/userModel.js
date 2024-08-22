const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    First_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },
    forgotPasswordOtp: {
      type: String,
    },
    forgotPasswordOtpExpire: {
      type: Date,
      default: "",
    },
    resetPasswordToken: {
      type: String,
      default: "",
    },
    resetPasswordTokenExpire: {
      type: Date,
      default: "",
    },
    address: String,
    country: String,
    state: String,
    city: String,
    user_type: {
      type: String,
    },
    companyName: String,
    bank_name: String,
    bank_account_number: String,
    CNIC: String,
    image: String,
    header: String,
    role: {
      type: String,
      enum: ["Admin", "user", "vendor", "freelancer"],
      default: "user",
    },
    isFreelancerVerified: {
      type: String,
      enum: ["pending", "approved", "rejected", ""],
      default: "",
    },
    isVendorVerified: {
      type: String,
      enum: ["pending", "approved", "rejected", ""],
      default: "",
    },
    OTPStatus: {
      type: String,
      enum: ["pending", "requested", "approved"],
      default: "pending",
    },

    paymentRecieved: {
      type: Number,
      default: 0,
    },
    paymentPending: {
      type: Number,
      default: 0,
    },

    status: Boolean,
    setNewPwd: Boolean,
    verified: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    isSocialLogin: {
      type: Boolean,
      default: false,
    },
    profileImg: {
      type: String,
      default: null,
    },
    experience: {
      title: {
        type: String,
        trim: true,
        // required: true,
      },
      companyName: {
        type: String,
        trim: true,
        // required: true,
      },
      companyAddress: {
        type: String,
        trim: true,
        // required: true,
      },
      experienceLevel: {
        type: String,
        enum: ["Basic", "Intermediate", "Expert"],
      },

      experienceStartDate: {
        type: String,
        trim: true,
        // required: true,
      },
      experienceEndDate: {
        type: String,
        trim: true,
      },
      isCurrentStatus: {
        type: Boolean,
        default: false,
      },
    },

    softDeleted: {
      type: Boolean,
      default: false,
    },
    permanentDeleted: {
      type: Boolean,
      default: false,
    },
    fcm_token: [{ type: String, default: [] }],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

module.exports = { User };
