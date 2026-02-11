const express=require("express");
const { Profile, userGetProfile } = require("../controller/profile_controller");
const loginrequire = require("../middlware/loginrequire");
const route=express.Router();


route.get("/profile",loginrequire,Profile);
route.get("/userProfile/:id",loginrequire,userGetProfile)


module.exports=route;