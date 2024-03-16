const Post = require("../../models/Post")

const updatePost = async(req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id});

    if(!post.comments) {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        comments: req.body.comments,
      }, 
      {
        new: true
      });
      return res.status(200).json(updatedPost);
    } else {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        comments: [...post.comments, req.body.comments],
      }, {
        new: true
      });
      return res.status(200).json(updatedPost);
    }
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = updatePost;
