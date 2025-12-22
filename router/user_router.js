const express=require("express");
const {register,login}=require("../controller/user_controller");

const userRouter=express.Router();

//register route ...

userRouter.post("/register",register);

//login route..

userRouter.post("/login",login);

module.exports=userRouter
