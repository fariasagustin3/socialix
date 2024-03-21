import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Messenger() {
  const [conversations, setConversations] = useState([])
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}conversations/${user._id}`);
        setConversations(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getConversations()
  }, [user._id])

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder="Search for friends" className="chatMenuInput" />
            {conversations?.map(conversation => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                currentUser={user}
              />
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own />
              <Message />
              <Message />
              <Message />
              <Message own />
              <Message own />
              <Message own />
              <Message />
              <Message />
              <Message />
              <Message own />
              <Message own />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea className="chatMessageInput" placeholder="Write something"></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
