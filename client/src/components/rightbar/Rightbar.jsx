import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext)
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id))
  }, [currentUser, user?._id])

  useEffect(() => {
    console.log(user)
    const getFriends = async() => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/friends/${user?._id}`);
        setFriends(res?.data);
      } catch(err) {
        console.log(err);
      }
    }

    getFriends();
  }, [user?._id])

  const handleClick = async(e) => {
    try {
      if(followed) {
        await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, { userId: currentUser._id})
        dispatch({ type: "UNFOLLOW", payload: user?._id })
      } else {
        await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, { userId: currentUser._id})
        dispatch({ type: "FOLLOW", payload: user?._id })
      }
    } catch(err) {
      console.log(err)
    }

    setFollowed(!followed)
  }

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
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
          
        </button>
      )}
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
          {friends.map((friend) => (
            <Link to={`/profile/${friend?.username}`} style={{ textDecoration: 'none' }}>
              <div className="rightbarFollowing">
                <img src={friend.profilePicture ? PUBLIC_FOLDER + friend.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} className="rightbarFollowingImg" alt="" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
          
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
