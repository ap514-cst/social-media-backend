const express=require("express");
const {register,login, findUser}=require("../controller/user_controller");

const userRouter=express.Router();

//register route ...

userRouter.post("/register",register);

//login route..

userRouter.post("/login",login);
//get route..
userRouter.get("/get",findUser)
module.exports=userRouter
