import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Comment from "../comment/Comment";

export default function Post({ post }) {
  const [like, setLike] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [comment, setComment] = useState("");
  const [showMore, setShowMore] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const userLoggedIn = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = async () => {
    console.log(post);
    try {
      axios.put(`${process.env.REACT_APP_API}posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const createComment = async (e) => {
    const commetaries = {
      userId: userLoggedIn._id,
      username: userLoggedIn.username,
      comment: comment,
      created: Date.now(),
      img: userLoggedIn?.profilePicture || "/assets/person/noAvatar.png",
    };

    try {
      await axios.put(`${process.env.REACT_APP_API}posts/${post._id}`, {
        comments: commetaries,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}users?userId=${post?.userId}`
      );
      setUser(res?.data);
    };

    fetchUser();
  }, [post?.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`/profile/${user?.username}`}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "/assets/person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user?.username} -</span>
            <span className="postDate">{format(post?.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon className="" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post?.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              onClick={likeHandler}
              className="likeIcon"
              src={"/assets/like.png"}
              alt=""
            />
            <img
              onClick={likeHandler}
              className="likeIcon"
              src={"/assets/heart.png"}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span
              className="postCommentText"
              onClick={() => setShowMore(!showMore)}
            >
              {post?.comments?.length} comments
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="inputContainer">
          <input
            type="text"
            className="commentInput"
            placeholder="Insert a commetary"
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="commentButton" onClick={createComment}>
            Comment
          </button>
        </div>
        {
          showMore &&
            post.comments
              .sort((a, b) => console.log(a.created))
              .map((p) => <Comment comments={p} />)

          // : post?.comments?.slice(2).sort((a, b) => b.created - a.created).map((p) => <Comment comments={p} />)
        }
        {/* {post.comments.length > 1 && (
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : "Show More"}
          </button>
        )} */}
      </div>
    </div>
  );
}
