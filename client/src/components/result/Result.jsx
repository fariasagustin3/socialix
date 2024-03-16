import { useEffect, useState } from 'react'
import './result.css'
import axios from 'axios'
import UserItem from '../userItem/UserItem';

export default function Result({ username}) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}users/search?username=${username}`);
        setUsers(res.data);
      } catch(err) {
        console.log(err)
      }
    }

    fetchUsers();
  }, [username])
  
  return (
    <div className='resultContainer'>
      <div className='resultWrapper'>
        {users?.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </div>
    </div>
  )
}
