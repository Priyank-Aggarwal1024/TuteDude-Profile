import { useState } from 'react'
import './App.css'
import Profile from './components/Profile'
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(null)
  const getProfile = async (email) => {
    const response = await axios.get(`https://tutedude-profile-backend.onrender.com/api/v1/profile/${email}`)
    if (response.data.profile) {
      setLoadingProfile(response.data.profile);
    }
  }
  const handleUser = () => {
    if (!name) {
      alert("Name is required");
    } else if (!email) {
      alert("Email is required");
    } else if (!phone) {
      alert("Phone is required");
    } else {
      setUserInfo(() => ({ name, email, phone }));
      getProfile(email).then(data => {
        localStorage.setItem("profile", JSON.stringify(loadingProfile))
        setShowProfile(true);
      }).catch(err => {
        if (err && err.response && err.response.data && err.response.data.message == 'User not found') {
          localStorage.setItem("profile", JSON.stringify({ ...userInfo }))
        }
        setShowProfile(true);
      })
    }
  }
  return (
    <>
      <div className="form">
        <div className="">
          <p className="">Name</p>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="">
          <p className="">Email</p>
          <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="">
          <p className="">Phone</p>
          <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <p className="set-profile" onClick={handleUser}>Set Profile</p>

      </div>
      {
        showProfile && <div className="profile-main">
          <Profile userInfo={userInfo} loadingProfile={loadingProfile} setLoadingProfile={setLoadingProfile} />
        </div>
      }
    </>
  )
}

export default App
