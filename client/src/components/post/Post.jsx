import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import axios from 'axios';
import { format } from 'timeago.js';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({})
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  useEffect(() => {
    const fetchUser = async() => {
      const res = await axios.get(`http://localhost:8800/api/users/${post.userId}`)
      setUser(res.data);
    }

    fetchUser();
  }, [post.userId])

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={user?.profilePicture || PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className="postProfileImg" />
            <span className="postUsername">{user?.username} -</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon className="" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PUBLIC_FOLDER + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img onClick={likeHandler} className="likeIcon" src={`${PUBLIC_FOLDER}like.png`} alt="" />
            <img onClick={likeHandler} className="likeIcon" src={`${PUBLIC_FOLDER}heart.png`} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
