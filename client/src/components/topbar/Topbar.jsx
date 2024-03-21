import "./topbar.css";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Result from "../result/Result";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if(!search) {
      setResults(false)
    } else {
      setResults(true)
    }
  }, [search])

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Socialix</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend"
            className="searchInput"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {results && (
          <Result username={search} />
        )}
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>

          <Link to="/messenger" style={{ color: 'inherit'}}>
            <div className="topbarIconItem">
              <ChatIcon />
              <span className="topbarIconBadge">1</span>
            </div>
          </Link>

          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img
          src={ user.profilePicture ? user.profilePicture : "/assets/person/noAvatar.png" }
          className="topbarImg"
          alt=""
          onClick={() => window.location.href = `http://localhost:3000/profile/${user.username}`}
        />
      </div>
    </div>
  );
}
