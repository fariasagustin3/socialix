import { useContext, useEffect, useState } from 'react';
import Post from '../post/Post'
import Share from '../share/Share'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './feed.css'

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async() => {
      const res = username
        ? await axios.get(`${process.env.REACT_APP_API}posts/profile/${username}`)
        : await axios.get(`${process.env.REACT_APP_API}posts/timeline/${user._id}`)
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }

    fetchPosts();
  }, [username, user._id])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        { (!username || username === user?.username) && <Share />}
        {posts?.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  )
}
