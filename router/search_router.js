const express=require("express");
const { searchUser } = require("../controller/search_controller");

const searchRouter=express.Router();


searchRouter.get("/searchUsers", searchUser)

module.exports=searchRouter