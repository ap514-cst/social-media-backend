const express=require("express");
const { searchUser } = require("../controller/search_controller");
const loginrequire = require("../middlware/loginrequire");

const searchRouter=express.Router();


searchRouter.get("/searchUsers",loginrequire ,searchUser)

module.exports=searchRouter