import { useEffect, useRef, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import axios from "axios";
import { useParams } from 'react-router';
import Edit from '@mui/icons-material/Edit';
import Cancel from '@mui/icons-material/Cancel';
import Check from '@mui/icons-material/Check';

export default function Profile() {
  const [user, setUser] = useState({})
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const userLoggedIn = JSON.parse(localStorage.getItem("user"));
  const [editUsername, setEditUsername] = useState(userLoggedIn.username)
  const [editDesc, setEditDesc] = useState(userLoggedIn.desc)
  const [username, setUsername] = useState(useParams().username)

  // function that edit user logged in
  const editUserLogged = (userUpdate) => {
    userLoggedIn.username = editUsername;
    userLoggedIn.desc = editDesc;
    if(!profilePicture) {
      userLoggedIn.profilePicture = user?.profilePicture
    } else {
      userLoggedIn.profilePicture = userUpdate?.profilePicture;
    }

    if(!coverPicture) {
      userLoggedIn.coverPicture = user?.coverPicture
    } else {
      userLoggedIn.coverPicture = userUpdate?.coverPicture;
    }

    localStorage.setItem("user", JSON.stringify(userLoggedIn))
  }

  // function that edit usar data
  const handleUpdate = async () => {
    const userUpdate = {
      userId: userLoggedIn._id,
      username: editUsername,
      desc: editDesc,
    };
  
    if (coverPicture) {
      const formData = new FormData();
      formData.append("coverPicture", coverPicture);
  
      const coverRes = await axios.post(`${process.env.REACT_APP_API}users/cover/upload`, formData);
      userUpdate.coverPicture = coverRes.data.data;
      editUserLogged(userUpdate);
    }
  
    if (profilePicture) {
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);
  
      const profileRes = await axios.post(`${process.env.REACT_APP_API}users/profile/upload`, formData);
      userUpdate.profilePicture = profileRes.data.data;
      editUserLogged(userUpdate);
    }
    
    await axios.put(`${process.env.REACT_APP_API}users/${userLoggedIn._id}`, userUpdate);
    editUserLogged(userUpdate)
    window.location.href = `http://localhost:3000/profile/${userUpdate.username}`
  };
  
  // handle profile lifecycle
  useEffect(() => {
    const fetchUser = async() => {
      const res = await axios.get(`${process.env.REACT_APP_API}users?username=${username}`)
      setUser(res.data);
    }

    fetchUser();
  }, [username])

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        {user._id === userLoggedIn._id && (
          <>
          <button className="profileEditButton" onClick={() => setEditMode(!editMode)}>
            {editMode ? <Cancel /> : <Edit />}
          </button>
          {editMode && (
            <button className="profileConfirmButton" onClick={handleUpdate}>
              <Check />
            </button>
          )}
          </>
        )}
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                {editMode ? (
                  <label htmlFor="coverImg">
                    <input type="file" id="coverImg" accept=".png, .jpeg, jpg" className="coverImgInput" onChange={(e) => setCoverPicture(e.target.files[0])} />
                    <img className="profileCoverImg" src={user?.coverPicture ? user.coverPicture : "/assets/person/noCover.png"} alt="" />
                  </label>
                ) : (
                  <img className="profileCoverImg" src={user?.coverPicture ? user.coverPicture : "/assets/person/noCover.png"} alt="" />
                )}
                {editMode ? (
                  <label htmlFor="profilePicture" className="profilePictureContainer">
                    <input type="file" id="profilePicture" accept=".png, .jpeg, jpg" className="profileImgInput" onChange={(e) => setProfilePicture(e.target.files[0])} />
                    <img className="profileUserImg" src={user?.profilePicture ? user.profilePicture : "/assets/person/noAvatar.png"} alt="" />
                  </label>
                ) : (
                  <img className="profileUserImg" src={user?.profilePicture ? user.profilePicture : "/assets/person/noAvatar.png"} alt="" />
                )}
              </div>
              <div className="profileInfo">
                {editMode ? (
                  <>
                    <input className="profileInfoNameInput" onChange={(e) => setEditUsername(e.target.value)} placeholder={user?.username || "Type your username"} />
                    <input className="profileInfoDescInput" onChange={(e) => setEditDesc(e.target.value)} placeholder={user?.desc || "Type your description"} />
                  </>
                ) : (
                  <>
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.desc}</span>
                  </>
                )}
              </div>
            </div>
            <div className="profileRightBottom">
              <Feed username={username} />
              <Rightbar user={user} editMode={editMode} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
