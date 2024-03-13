const Post = require("../../models/Post");

const manageLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked")
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked")
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = manageLikes;
