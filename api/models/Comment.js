const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  username: {
    type: String,
  },
  desc: {
    type: String,
    max: 500,
  },
  userImg: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;