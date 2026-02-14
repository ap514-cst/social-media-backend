const express=require("express");
const { searchUser } = require("../controller/search_controller");

const searchRouter=express.Router();


searchRouter.get("/search", searchUser)

module.exports=searchRouter