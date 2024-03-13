const Post = require("../../models/Post")
const User = require("../../models/User")

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = getUserProfile;
