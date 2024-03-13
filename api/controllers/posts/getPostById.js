const Post = require("../../models/Post")

const getPostById = async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = getPostById;
