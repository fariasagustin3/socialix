import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            className="birthdayImg"
            src="/assets/gift.png"
            alt=""
          />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAdd" src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return(
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user?.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user?.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user?.relationship === 1 ? "Single" : user?.relationship === 2 ? "Married" : "Widow"}</span>
          </div>
        </div>
        <h4>User friends</h4>
        <div className="righbarFollowings">
          <div className="rightbarFollowing">
            <img src={`${PUBLIC_FOLDER}person/1.jpeg`} className="rightbarFollowingImg" alt="" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PUBLIC_FOLDER}person/2.jpeg`} className="rightbarFollowingImg" alt="" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PUBLIC_FOLDER}person/3.jpeg`} className="rightbarFollowingImg" alt="" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PUBLIC_FOLDER}person/4.jpeg`} className="rightbarFollowingImg" alt="" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PUBLIC_FOLDER}person/5.jpeg`} className="rightbarFollowingImg" alt="" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PUBLIC_FOLDER}person/6.jpeg`} className="rightbarFollowingImg" alt="" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? (
          <ProfileRightbar />
        ) : (
          <HomeRightBar />
        )}
      </div>
    </div>
  );
}
