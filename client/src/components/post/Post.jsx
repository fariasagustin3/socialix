import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src="/assets/person/1.jpeg" alt="profile picture" className="postProfileImg" />
            <span className="postUsername">John Doe</span>
            <span className="postDate">5 mins ago</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon className="" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Hey! It's my first post</span>
          <img className="postImg" src="/assets/post/1.jpeg" alt="post image" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" alt="like image" />
            <img className="likeIcon" src="/assets/heart.png" alt="heart image" />
            <span className="postLikeCounter">32 people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
