import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./chatOnline.css";
import { io } from "socket.io-client";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const socket = useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, [])

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}users/friends/` + currentId
      );
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}conversations/find/${currentId}/${user._id}`
      );
      if (!res.data) {
        const newConv = await axios.post(`${process.env.REACT_APP_API}conversations`, {
          senderId: currentId,
          receiverId: user._id
        });
        if(newConv.status === 200) {
          setCurrentChat(newConv.data);
        }
      } else {
        return setCurrentChat(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          key={o}
          className="chatOnlineFriend"
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? o.profilePicture
                  : "/assets/person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
