const User=require("../model/user.model")
const Post=require("../model/products.model")


const Profile=async(req,res)=>{
 try {
   Post.find({postedBy:req.user._id}).populate("postedBy","_id name").sort({createdAt: -1})
   .then(myprofile=>{
    res.status(202).json(myprofile)
   })
    
  

 } catch (error) {
    console.log(error);
    
 }
}

const userGetProfile=async(req,res)=>{
    try {
      const users=await User.findById(req.params.id).select("-password");
      const posts=await Post.find({postedBy:req.params.id})
      .populate("postedBy","_id name")
      .sort("-createdAt")
      
      res.json({users,posts})

    } catch (error) {
      res.status(500).json({message:"internal server is down"})
      console.log("error",error);
      
    }
}



module.exports={Profile,userGetProfile}