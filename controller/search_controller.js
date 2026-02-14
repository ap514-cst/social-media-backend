const User=require("../model/user.model")

const searchUser= async(req,res)=>{
  try {
    const keyword=req.query.search;

    if(!keyword){
      return res.json([])
    }
    const result=await User.find({
      $or:[
        {name:{$regex:keyword,$options:"i"}}
      ]
    }).select("_id name")
    .limit(5)

    res.json(result)
    
  } catch (error) {
    console.log(error);
    
  }
}

module.exports={searchUser}