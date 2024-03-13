import "./closeFriend.css"

export default function CloseFriend({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img
        src={user?.profilePicture || "/assets/person/noAvatar.png"}
        className="sidebarFriendImg"
        alt=""
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
