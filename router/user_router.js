const express=require("express");
const {register,login}=require("../controller/user_controller");
const authMiddleware=require("../middlware/auth")
const userRouter=express.Router();

//register route ...

userRouter.post("/register",register);

//login route..

userRouter.post("/login",login);

userRouter.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route",
    userId: req.user.id
  });
});
//get route..
//userRouter.get("/get",findUser)
module.exports=userRouter
