const Post = require("../../models/Post");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message })
  }
}

module.exports = getAllPosts;
