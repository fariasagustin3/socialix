import './share.css';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Cancel from '@mui/icons-material/Cancel'

export default function Share() {
  const { user } = useContext(AuthContext);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if(file) {
      const formData = new FormData();
      formData.append("file", file);
  
      const res = await axios.post("http://localhost:8800/api/posts/upload", formData);
      if(res.data.status === "OK") {
        newPost.img = res.data.data;
        await axios.post("http://localhost:8800/api/posts", newPost);
        window.location.reload()
      }
    } else {
      await axios.post("http://localhost:8800/api/posts", newPost)
      window.location.reload()
    }

  };

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={ user.profilePicture ?  user.profilePicture : "/assets/person/noAvatar.png" } className="shareProfilePicture" alt="" />
          <input ref={desc} placeholder={`What's in your mind, ${user.username}?`} type="text" className="shareInput" />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className='shareImg' src={URL.createObjectURL(file)} alt="" />
            <Cancel className='shareCancel' onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor='file' className="shareOption">
              <PermMediaIcon htmlColor='tomato' className='shareIcon' />
              <span className="shareOptionText">Photo or Video</span>
              <input style={{ display: 'none' }} type="file" id="file" accept='.png, .jpeg, .jpg' onChange={(e) => setFile(e.target.files[0])} />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor='blue' className='shareIcon' />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <RoomIcon htmlColor='green' className='shareIcon' />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor='goldenrod' className='shareIcon' />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className='shareButton'>Share</button>
        </form>
      </div>
    </div>
  )
}
