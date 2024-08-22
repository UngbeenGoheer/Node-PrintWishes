const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const nodemailer = require("nodemailer");

/**SignUp */
exports.SignUp = async (req, res) => {
  const {
    First_name,
    last_name,
    email,
    phone,
    country,
    state,
    city,
    address,
    password,
    confirmPassword,
  } = req.body;

  if (
    !(
      First_name &&
      last_name &&
      email &&
      phone &&
      country &&
      state &&
      city &&
      address &&
      password &&
      confirmPassword
    )
  ) {
    console.error("Required field missing");
    return res.status(400).json({
      success: false,
      error: "All fields are required",
    });
  }

  const Olduser = await User.findOne({ email });
  if (Olduser)
    return res.status(400).json({
      success: false,
      message: "User already Exist",
    });

  if (password !== confirmPassword) {
    console.error("Password and ConfirmPassord are not match");
    return res.status(400).json({
      success: false,
      error: "Password and ConfirmPassord are not match",
    });
  }
  const encryptPwd = await bcrypt.hash(password, 10);

  const user = await User.create({
    First_name,
    last_name,
    email,
    phone,
    country,
    state,
    city,
    address,
    role: req?.body?.role ? req.body.role : undefined,
    password: encryptPwd,
  });
  const token = jwt.sign(
    {
      id: user._id,
      email,
    },
    "shhhhh"
  );
  user.token = token;
  user.password = undefined;
  return res.status(200).json({ success: true, message: "User Created " });
};

/**Login */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password))
      return res
        .status(400)
        .json({ success: false, message: "Invalid Information" });
    const Olduser = await User.findOne({ email });

    if (!Olduser) {
      return res.status(400).json({
        success: false,
        message: "User not Exist",
      });
    }
    if (Olduser && bcrypt.compare(password, Olduser.password)) {
      const token = jwt.sign(
        {
          id: Olduser._id,
          email,
        },
        "shhhhh"
      );
      Olduser.password = undefined;

      return res.status(200).json({
        success: true,
        message: "Login successfully",
        data: Olduser,
        token,
      });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**ForgotPwd */
exports.forgotPwd = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({
        success: false,
        message: "Please enter the Email",
      });
    const checkmail = User.findOne({ email });
    if (!checkmail)
      return res.status(400).json({
        success: false,
        message: "User not Exist",
      });
    const Otp = (Math.floor(Math.random() * 899999) + 100000).toString();
    await User.findOneAndUpdate(
      { email },
      {
        forgotPasswordOtp: Otp,
        forgotPasswordOtpExpire: Date.now() + 5 * 60 * 1000,
      }
    );

    res.status(200).json({ message: `OTP is ${Otp}` });
  } catch (error) {
    return res.state(400).json({ success: false, message: error });
  }
};
/**Verify OTP */
exports.VerifyOTP = async (req, res) => {
  try {
    const { email, Otp } = req.body;
    if (!(email && Otp)) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const check = await User.findOne({
      email,

      forgotPasswordOtpExpire: { $lt: Date.now() },
    });
    if (!check) {
      return res
        .status(400)
        .json({ success: false, message: "Session Expired" });
    }
    if (check.Otp === Otp) {
      await User.findOneAndUpdate(
        { email },

        {
          setNewPwd: true,
        }
      );
    }
    return res
      .status(200)
      .json({ success: true, message: "Verify OTP  successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: Error });
  }
};
/**Reset Password */
exports.resetPwdd = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Email" });
    }
    const oldUser = await User.findOne({ email });
    if (!oldUser?.setNewPwd) {
      return res.status(400).json({
        success: false,
        message: "You are not allowed ",
      });
    }
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Password & Confirm Password",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password & Confirm Password Are Not Same",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    return res.status(200).json({
      success: true,
      message: "Password Updated Successfully",
      data: hashedPassword,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
/**GetAll */
exports.getAll = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    if (!user) {
      res.status(400).json({ success: true, message: "User not find", user });
    }
    res.status(200).json({ success: true, message: "Get All user", user });

    return res.status(200).json({
      success: true,
      message: "Users get successfully.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get one

exports.getAuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: true, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User found successfully.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
/**UpdateUser */
exports.UpdateUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      console.error("User not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (req?.body?.First_name) {
      user.First_name = req.body.First_name;
    }
    if (req?.body?.last_name) {
      user.last_name = req.body.last_name;
    }
    if (req?.body?.email) {
      user.email = req.body.email;
    }
    if (req?.body?.phone) {
      user.phone = req.body.phone;
    }
    if (req?.body?.country) {
      user.country = req.body.country;
    }
    if (req?.body?.state) {
      user.state = req.body.state;
    }
    if (req?.body?.city) {
      user.city = req.body.city;
    }
    if (req?.body?.city) {
      user.city = req.body.city;
    }
    if (req?.body?.address) {
      user.address = req.body.address;
    }
    if (req?.body?.password) {
      user.password = req.body.password;
    }
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User Updated Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}; /**DeleteUser */
exports.DeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });

    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
