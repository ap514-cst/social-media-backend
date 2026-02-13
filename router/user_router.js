const express=require("express");
const {register,login, searchUser}=require("../controller/user_controller");

const userRouter=express.Router();

//register route ...

userRouter.post("/register",register);

//login route..

userRouter.post("/login",login);

//search route..

userRouter.get("/search",searchUser)

  
module.exports=userRouter
