import "./comment.css";
import { format } from "timeago.js";

export default function Comment({ comments }) {
  return (
    <div className="container">
      <div className="commentContainer">
        <div className="imgContainer">
          <img src={comments.img || "/assets/person/1.jpeg"} alt="" className="commentPicture" />
        </div>
        <div className="userdataContainer">
          <div className="usernameContainer">
            <span className="username">{comments.username} - </span>
            <span className="date">{format(comments.created)}</span>
          </div>
          <span className="comment">{comments.comment}</span>
        </div>
      </div>
    </div>
  );
}
