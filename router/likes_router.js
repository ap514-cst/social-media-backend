const express=require("express");
const loginrequire = require("../middlware/loginrequire");
const { likes, Dislikes } = require("../controller/likes_controller");
const route=express.Router();


route.put("/likes",loginrequire,likes)
route.put("/dislikes",loginrequire,Dislikes)

module.exports=route;