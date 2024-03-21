import { useEffect, useState } from 'react';
import './conversation.css'
import axios from 'axios';

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}users?userId=${friendId}`)
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getUser()
  }, [currentUser, conversation])
  return (
    <div className='conversation'>
      <img src={user?.profilePicture || "/assets/person/noAvatar.png"} alt="" className="conversationImg" />
      <span className="conversationName">{user?.username}</span>
    </div>
  )
}
