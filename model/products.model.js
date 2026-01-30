const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types
const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
     
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    image: {
      type: String,
      
      
    },
    postedBy:{
        type:ObjectId,
        ref:"User",
    }
    
},{timestamps:true});

const product=mongoose.model("products",productSchema)
module.exports=product