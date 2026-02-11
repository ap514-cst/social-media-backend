const express=require("express");
const loginrequire = require("../middlware/loginrequire");
const { comment } = require("../controller/comment_controller");
const { deleteComment } = require("../controller/deleteComment");
const router=express.Router();

router.put("/comment",loginrequire,comment)
router.put("/deletecomment",loginrequire,deleteComment)
module.exports=router