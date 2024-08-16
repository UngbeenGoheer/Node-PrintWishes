const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      password
    )
  )
    return res.status(400).json({
      error: "All fields are required",
    });
  const Olduser = await User.findOne({ email });
  if (Olduser)
    return res.status(400).json({
      success: false,
      message: "User already Exist",
    });
  const encryptPwd = await bcrypt.hash(password, 10);
  // if (password !== re_enterdPassword)
  //   return res.status(400).json({ error: "Password are not Same" });
  const user = await User.create({
    First_name,
    last_name,
    email,
    phone,
    country,
    state,
    city,
    address,
    role: req.body.role,
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
    const forgotPwdOtp = (
      Math.floor(Math.random() * 899999) + 100000
    ).toString();
    const user = await User.findOneAndUpdate(
      { email },
      {
        forgotPwdOtp,
        forgotPwdOtpExpire: Date.now() + 5 * 60 * 1000,
      }
    );
    console.log(forgotPwdOtp);
    return res
      .status(200)
      .json({ success: true, message: "OTP has been transfer to your email" });
  } catch (error) {
    return res.state(400).json({ success: false, message: error });
  }
};
/**VerifyPwd */
exports.VerifyPwd = async (req, res) => {
  try {
    const { email, forgotPwd } = req.body;
    if (!(email && forgotPwd)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter your information" });
    }
    const check = await User.findOne({ email, OtpExpire: { $gt: Date.now() } });
    if (!check) {
      return res
        .status(400)
        .json({ success: false, message: "Session Expired" });
    }
    if (forgotPwdOtp === check.forgotPwdOtp) {
    }
    if (valid) {
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
    if (!oldUser.setNewPwd) {
      return res.status(400).json({
        success: false,
        message: "You are not allowed ",
      });
    }
    const { password } = req.body;
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
    await User.findOneAndUpdate({ email }, {});
    return res
      .status(200)
      .json({ success: true, message: "Password Updated Successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
/**GetAll */
exports.getAll = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ success: true, message: "Get All user", user });
    exports.getAuser = async (req, res) => {
      try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res
            .status(404)
            .json({ success: true, message: "User not found" });
        }
        return res.status(200).json({
          success: true,
          message: "Users get successfully.",
          data: user,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    };
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get one

exports.getAuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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
