import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Cancel from "@mui/icons-material/Cancel";
import Check from "@mui/icons-material/Check";
import Edit from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const usr = localStorage.getItem("user");
  const userLoggedIn = JSON.parse(usr);
  const location = useLocation();

  const editCity = useRef();
  const editFrom = useRef();
  const editRelationship = useRef();

  // function that replace the new data from local storage
  const handleSession = (userData) => {
    console.log("userData", userData);

    const userSession = localStorage.getItem("user");
    const userSessionParsed = JSON.parse(userSession);

    userSessionParsed.city = userData.city;
    userSessionParsed.from = userData.from;
    userSessionParsed.relationship = userData.relationship;

    const userSessionStringified = JSON.stringify(userSessionParsed);
    localStorage.setItem("user", userSessionStringified);

    window.location.reload();
  };

  // function that submit edit form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const editData = {
      userId: userLoggedIn._id,
      city: editCity.current.value || user.city,
      from: editFrom.current.value || user.from,
      relationship:
        parseInt(editRelationship.current.value) || user.relationship,
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}users/${userLoggedIn._id}`,
        editData
      );
      res.data && handleSession(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user?._id]);

  useEffect(() => {
    console.log("location: ", location);
    const getFriends = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/friends/${user?._id}`
        );
        setFriends(res?.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFriends();
  }, [user?._id]);

  const handleClick = async (e) => {
    try {
      if (followed) {
        await axios.put(
          `http://localhost:8800/api/users/${user?._id}/unfollow`,
          { userId: currentUser?._id }
        );
        dispatch({ type: "UNFOLLOW", payload: user?._id });
      } else {
        await axios.put(`http://localhost:8800/api/users/${user?._id}/follow`, {
          userId: currentUser?._id,
        });
        dispatch({ type: "FOLLOW", payload: user?._id });
      }
    } catch (err) {
      console.log(err);
    }

    setFollowed(!followed);
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAdd" src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online key={user?.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user?.username !== currentUser?.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <div className="rightbarTitleContainer">
          <h4 className="rightbarTitle">User information</h4>
          {user?._id === userLoggedIn?._id && (
            <button className="rightbarEditButton">
              {editMode ? (
                <Cancel
                  className="rightbarButton"
                  onClick={() => setEditMode(false)}
                />
              ) : (
                <Edit
                  className="rightbarButton"
                  onClick={() => setEditMode(true)}
                />
              )}
            </button>
          )}
          {editMode && (
            <button onClick={handleEditSubmit} className="rightbarEditButton">
              <Check className="rightbarButton" />
            </button>
          )}
        </div>
        <form className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            {editMode ? (
              <input
                type="text"
                className="rightbarInfoValueInput"
                placeholder="Type your city"
                ref={editCity}
              />
            ) : (
              <span className="rightbarInfoValue">{userLoggedIn?.city}</span>
            )}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            {editMode ? (
              <input
                type="text"
                className="rightbarInfoValueInput"
                placeholder="Type where are you from"
                ref={editFrom}
              />
            ) : (
              <span className="rightbarInfoValue">{userLoggedIn?.from}</span>
            )}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            {editMode ? (
              <input
                type="text"
                className="rightbarInfoValueInput"
                placeholder="a number between 1/2/3"
                ref={editRelationship}
              />
            ) : (
              <span className="rightbarInfoValue">
                {userLoggedIn?.relationship === 1
                  ? "Single"
                  : userLoggedIn?.relationship === 2
                  ? "Married"
                  : "Widow"}
              </span>
            )}
          </div>
        </form>
        <h4>User friends</h4>
        <div className="righbarFollowings">
          {friends.map((friend) => (
            <div
              className="rightbarFollowing"
              onClick={() =>
                (window.location.href = `http://localhost:3000/profile/${friend.username}`)
              }
            >
              <img
                src={
                  friend.profilePicture
                    ? friend.profilePicture
                    : "/assets/person/noAvatar.png"
                }
                className="rightbarFollowingImg"
                alt=""
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {userLoggedIn && location.pathname !== "/" ? (
          <ProfileRightbar />
        ) : (
          <HomeRightBar />
        )}
      </div>
    </div>
  );
}
