
const ProductModel = require("../model/products.model")





// getProducts 
const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().populate("postedBy", "name email").sort({createdAt: -1})
        if (products.length === 0) {
            return res.status(404).json({ message: "No Product Found" });
        } else {
            return res.status(200).json({
                message: "Products ",
                products
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });

    }
}

//postProduct.
const postProduct = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        if (!title || !description) {
            return res.status(404).json({ message: "Please fill the required" })
        }
        req.user
        const newPost = new ProductModel({
            title:title || "",
            description:description || "",
            image: image,
            postedBy: req.user._id
        })
        const UserPost = await newPost.save()
        if (UserPost) {
            res.status(202).json({ message: "done", UserPost })
        } else {
            res.status(404).json("post faild")
        }
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json("internal server is down")
    }
}

//deleted Product..

const deletedProduct = async (req, res) => {
    try {
        const post=await ProductModel.findById(req.params.id)
        
        
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        //only owner can delete
        if(post.postedBy.toString() !==req.user._id.toString()){
            return res.status(403).json({message:"You cannot delete this post"})
        }
        await ProductModel.findByIdAndDelete(req.params.id);

        res.json({message:"Post deleted successfully"})
       
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//search route..

const search = async (req, res) => {
    try {
        const result = await Product.find({
            "$or": [
                { title: { $regex: req.params.key } },

            ]
        })
        if (result) {
            res.status(201).json({
                message: "succesful",
                result

            })
        }
        else {

            return res.status(404).json({
                error: "no data exjiste"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}
module.exports = { getProducts, postProduct, deletedProduct, search };