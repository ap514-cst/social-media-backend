const Post = require("../model/products.model");

const comment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    const result = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            text,
            postedBy: req.user._id
          }
        }
      },
      { new: true }
    ).populate("comments.postedBy", "_id name");

    res.json(result);

  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
};

module.exports = { comment };
