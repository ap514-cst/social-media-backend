const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
require("dotenv").config();
const userRouter=require("./router/user_router")
const productRouter=require("./router/products_router")

const fileUpload=require("express-fileupload")
const app=express();



const PORT=process.env.PORT || 3002;
MONGODB_URL=process.env.MONGODB_URL;
//const MONGODB_URL="mongodb+srv://apomojumder688_db_user:samapo7716@social-media.5yve62g.mongodb.net/"
app.use(fileUpload({
    useTempFiles:true
}))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/user",userRouter)
app.use("/api/products",productRouter)


app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log("database is connect");
        
    }).catch((error)=>{
        console.log("database is not connected",error.message)
    })
})