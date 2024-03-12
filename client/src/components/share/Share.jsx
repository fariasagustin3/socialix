import './share.css';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

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
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post(process.env.REACT_APP_API + "upload", data);
      } catch (err) {}
    }
    try {
      await axios.post(process.env.REACT_APP_API + "posts", newPost);
    } catch (err) {}
  };

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={ user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png" } className="shareProfilePicture" alt="" />
          <input ref={desc} placeholder={`What's in your mind, ${user.username}?`} type="text" className="shareInput" />
        </div>
        <hr className="shareHr" />
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
