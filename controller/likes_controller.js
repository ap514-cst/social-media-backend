const Posts = require("../model/products.model");

const likes = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ error: "postId is missing" });
    }

    const result = await Posts.findByIdAndUpdate(
      postId,
      {
        $addToSet: {   // 👈 duplicate like prevent করবে
          likes: req.user._id
        }
      },
      { new: true }
    ).populate("postedBy", "_id name");

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const Dislikes = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ error: "postId is missing" });
    }

    const result = await Posts.findByIdAndUpdate(
      postId,
      {
        $pull: {
          likes: req.user._id
        }
      },
      { new: true }
    );

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports={likes,Dislikes}