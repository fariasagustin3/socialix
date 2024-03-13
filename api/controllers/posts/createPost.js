const Post = require("../../models/Post");

const createPost = async(req, res) => {
  const post = new Post(req.body);

  try {
    const postSaved = await post.save();
    res.status(200).json(postSaved);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = createPost;
