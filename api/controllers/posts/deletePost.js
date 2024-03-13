const Post = require("../../models/Post");

const deletePost = async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({ status: 'OK', message: "post deleted successfully." });
    } else {
      return res.status(404).json({ error: "Your can delete only your post" });
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = deletePost;
