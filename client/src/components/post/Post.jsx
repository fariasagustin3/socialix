import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Users } from '../../dummyData';

export default function Post({ post }) {
  const user = Users.filter((user) => user.id === 1);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={Users.filter((user) => user.id === post.userId)[0].profilePicture} alt="profile picture" className="postProfileImg" />
            <span className="postUsername">{Users.filter((user) => user.id === post.userId)[0].username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon className="" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photo} alt="post image" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" alt="like image" />
            <img className="likeIcon" src="/assets/heart.png" alt="heart image" />
            <span className="postLikeCounter">{post.like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
