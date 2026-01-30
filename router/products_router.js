const express=require("express");
//const upload=require("../middlware/uploadMiddleware")
const {getProducts, postProduct, deletedProduct, search}=require("../controller/products_controller");
const loginAuth = require("../middlware/loginrequire");
const route=express.Router()


//get all products route..


route.get("/get",getProducts)
route.post("/post",loginAuth,postProduct)
route.delete("/delete/:id",deletedProduct)
route.get("/search/:key",search)
module.exports=route;
