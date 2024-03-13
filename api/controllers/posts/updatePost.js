const Post = require("../../models/Post");

const updatePost = async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ status: 'OK', message: "post updated successfully." });
    } else {
      return res.status(404).json({ error: "Your can update only your post" });
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = updatePost;
