const Post = require("../models/Post");
const User = require("../models/User");

const router = require("express").Router();

// get all posts route
router.get("/list", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message })
  }
});

// create a post route
router.post("/", async(req, res) => {
  const post = new Post(req.body);

  try {
    const postSaved = await post.save();
    res.status(200).json(postSaved);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
})

// update a post route
router.put("/:id", async(req, res) => {
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
})

// delete a post route
router.delete("/:id", async(req, res) => {
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
})

// like/dislike a post route
router.put("/:id/like", async (req, res) => {
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
});

// get a single post route
router.get("/:id", async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// get timeline posts route
router.get("/timeline/all", async (req, res) => {
  try {
    try {
      const currentUser = await User.findById(req.body.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId })
      }));

      res.status(200).json(userPosts.concat(...friendPosts));
    } catch(err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
