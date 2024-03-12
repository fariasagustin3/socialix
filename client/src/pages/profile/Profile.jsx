import { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import axios from "axios";
import { useParams } from 'react-router';

export default function Profile() {
  const [user, setUser] = useState({})
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;

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
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={user?.coverPicture ? PUBLIC_FOLDER + user.coverPicture : PUBLIC_FOLDER + "person/noCover.png"} alt="" />
              <img className="profileUserImg" src={user?.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
