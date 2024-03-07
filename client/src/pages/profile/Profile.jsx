import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={`${PUBLIC_FOLDER}post/3.jpeg`} alt="" />
              <img className="profileUserImg" src={`${PUBLIC_FOLDER}person/7.jpeg`} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">John Doe</h4>
              <span className="profileInfoDesc">This is the profile description, please rate this!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
