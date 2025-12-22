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
        console.log("📥 Request Body:", req.body);
        console.log("🖼️ Uploaded File:", req.file);

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        // File upload check
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image file is required"
            });
        }

        const newProduct = new Product({
            title: title.trim(),
            description: description.trim(),
            image: req.file.filename
        });

        console.log("💾 Saving to MongoDB...");

        // 2. MongoDB-এ save করুন
        const savedProduct = await newProduct.save();

        console.log("✅ Saved to MongoDB:", savedProduct);

        // 3. Image URL তৈরি করুন
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        res.status(201).json({
            success: true,
            message: "✅ Post created and saved to database successfully!",
            data: {
                id: savedProduct._id,
                title: savedProduct.title,
                description: savedProduct.description,
                image: savedProduct.image,
                imageUrl: imageUrl,
                imagePath: `/uploads/${req.file.filename}`,
                createdAt: savedProduct.createdAt // Timestamp
            }
        });

    } catch (error) {
        console.error("❌ Error creating post:", error);

        // Handle specific MongoDB errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
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