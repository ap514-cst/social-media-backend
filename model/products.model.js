
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const productSchema = new mongoose.Schema({
    title: {
        type: String,

        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true

    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    postedBy: {
        type: ObjectId,
        ref: "User",
    }

}, { timestamps: true });

const product = mongoose.model("Products", productSchema)
module.exports = product