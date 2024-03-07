import { useEffect, useState } from 'react';
import Post from '../post/Post'
import Share from '../share/Share'
import axios from 'axios';
import './feed.css'

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async() => {
      const res = await axios.get("http://localhost:8800/api/posts/timeline/65ea0184b366833e6cf37da6")
      setPosts(res.data);
    }

    fetchPosts();
  }, [])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share />
        {posts?.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  )
}
