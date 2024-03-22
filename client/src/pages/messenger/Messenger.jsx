import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from 'socket.io-client'

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const socket = useRef(io("ws://localhost:8900"))
  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io("ws://localhost:8900")
  }, [])

  useEffect(() => {
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", users => {
      console.log(users)
    })
  }, [user])

  const scrollRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}messages`, message);
      setMessages([...messages, message])
      setNewMessage("")
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}conversations/${user._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}messages/${currentChat?._id}`)
        setMessages(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getMessages()
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {conversations?.map((conversation) => (
              <div onClick={() => setCurrentChat(conversation)}>
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                  currentUser={user}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map(message => (
                    <div ref={scrollRef}>
                      <Message key={message._id} message={message} own={message.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
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
