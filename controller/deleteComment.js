const Post=require("../model/products.model")
const deleteComment=async(req,res)=>{
    try {
        const {postId,commentId}=req.body;

        const post=await Post.findByIdAndUpdate(postId,{
            $pull:{comments:{_id:commentId}}
        },
        {new:true}
    ).populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")

    res.json(post)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports={deleteComment}