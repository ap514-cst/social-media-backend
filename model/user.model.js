const mongoose=require("mongoose");

const userModel=mongoose.Schema({
    name:{
        type:String,
        require,
    },
    email:{
        type:String,
        require,
    },
    password:{
        type:String,
        require,
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

module.exports= userSchema=mongoose.model("users",userModel)