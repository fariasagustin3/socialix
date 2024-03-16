import "./userItem.css";

export default function UserItem({ user }) {
  return (
    <div className="container" onClick={() => window.location.href=`http://localhost:3000/profile/${user.username}`}>
      <img
        src={user?.profilePicture || "/assets/person/noAvatar.png"}
        alt=""
        className="profilePicture"
      />
      <span className="username">{user?.username}</span>
    </div>
  );
}
