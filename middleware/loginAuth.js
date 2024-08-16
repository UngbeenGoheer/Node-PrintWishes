const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const loginAuth = async (req, res, next) => {
  // check header
  // console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(400)
      .json({ status: false, message: "Authentication Invalid" });
  }
  const token = authHeader.split(" ")[1];

  // console.log(authHeader);
  if (!token) {
    return res.status(400).json({ success: false, message: "Token not found" });
  }

  try {
    const payload = jwt.verify(token, "shhhhh");

    const user = await User.findById(payload.id).select("-password");
    req.role = user.role;
    // req.user = user

    req.user = { id: payload.id };
    next();
  } catch (error) {
    console.log("34567", error);

    return res
      .status(400)
      .json({ status: false, message: "Authentication Invalid" });
  }
};

module.exports = { loginAuth };
