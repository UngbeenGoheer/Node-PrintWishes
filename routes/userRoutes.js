const userRouter = require("express").Router();

const { loginAuth } = require("../middleware/loginAuth");

const {
  SignUp,
  login,
  resetPwdd,
  VerifyPwd,
  forgotPwd,
  getAll,
  getAuser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/userController");
userRouter.post("/create", SignUp);
userRouter.post("/login", login);
userRouter.post("/forgot", forgotPwd);
userRouter.post("/reset", resetPwdd);
userRouter.post("/verify", VerifyPwd);
userRouter.get("/getAll", getAll);
userRouter.get("/get/:id", loginAuth, getAuser);
userRouter.post("/update/:id", UpdateUser);
userRouter.delete("/delete/:id", DeleteUser);

module.exports = { userRouter };
