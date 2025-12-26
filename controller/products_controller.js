const mongoose = require("mongoose");
const ProductModel = require("../model/products.model")
const Product = mongoose.model("products", ProductModel)




// getProducts 
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
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
        const { title, description } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Image is requied" })
        }
       

        const newPost = new Product({
            title,
            description,
            image
        })

        await newPost.save();
        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });
    } catch (error) {
        console.log("error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
}
//deleted Product..

const deletedProduct = async (req, res) => {
    try {
        const result = Product.deleteOne({ _id: req.params })
        if (!result) {
            return res.status(404).json({
                message: "data not detede"
            })
        } else {
            res.status(201).json({
                message: "done"
            })
        }

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