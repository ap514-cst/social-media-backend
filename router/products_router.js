const express=require("express");
//const upload=require("../middlware/uploadMiddleware")
const {getProducts, postProduct, deletedProduct, search}=require("../controller/products_controller")
const route=express.Router()


//get all products route..


route.get("/get",getProducts)
route.post("/post",postProduct)
route.delete("/delete/:id",deletedProduct)
route.get("/search/:key",search)
module.exports=route;
