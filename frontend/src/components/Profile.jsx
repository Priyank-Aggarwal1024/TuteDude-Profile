import '../styles/Profile.css'
import { useState } from 'react'
import rightArrow from '../assets/rightArrow.svg'
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import axios from 'axios';
function Profile({ userInfo, loadingProfile, setLoadingProfile }) {
    const [profile, setProfile] = useState(loadingProfile ? loadingProfile : { ...JSON.parse(localStorage.getItem("profile")) || {}, ...userInfo })
    const [progress, setProgress] = useState(16);
    const [tab, setTab] = useState(1);
    const [edit, setEdit] = useState([]);
    const handleEdit = (name) => {
        if (edit.indexOf(name) == -1) {
            setEdit([...edit, name]);
        }
    }
    const saveAndNext = () => {
        // console.log(profile)
        localStorage.setItem("profile", JSON.stringify(profile));
    }
    const saveProfile = async () => {
        localStorage.setItem("profile", JSON.stringify(profile));
        try {
            if (loadingProfile) {
                const data = await axios.post("https://tutedude-profile-backend.onrender.com/api/v1/update-profile", {
                    profile,
                    edit
                })
                const resData = data.data.profile;
                if (resData) {
                    localStorage.setItem("profile", JSON.stringify(resData));
                    setProfile(resData);
                    setEdit([]);
                }
                console.log(resData)
            }
            else {
                const data = await axios.post("https://tutedude-profile-backend.onrender.com/api/v1/create-profile", {
                    profile
                })
                const resData = data.data.profile;
                setLoadingProfile(resData)
                if (resData) {
                    localStorage.setItem("profile", JSON.stringify(resData));
                    setProfile(resData)
                    setEdit([]);
                }
                console.log(resData)
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleNext = () => {
        saveAndNext();
        if (tab < 7) setTab(tab + 1);
        if (tab == 7) saveProfile();
    }
    const handlePrevious = () => {
        setTab(tab - 1)
    }


    return (
        <>
            <div className="profile">
                <div className="profile-popup">
                    <div className="profile-pop-top">
                        <div className="ppt-progress-div">
                            <div className="ppt-progressbar">
                                <div className="ppt-progressbar-filled" style={{ height: "14px", width: `${progress}%` }}></div>
                            </div>
                            <div className="ppt-progress-text">{progress}%</div>
                        </div>
                    </div>
                    <div className="profile-pop-middle">
                        {
                            tab == 1 ?
                                <Step1 profile={profile} setProfile={setProfile} handleEdit={handleEdit} /> :
                                tab == 2 ?
                                    <Step2 profile={profile} setProfile={setProfile} handleEdit={handleEdit} /> :
                                    tab == 3 ?
                                        <Step3 profile={profile} setProfile={setProfile} handleEdit={handleEdit} /> :
                                        tab == 4 ?
                                            <Step4 profile={profile} setProfile={setProfile} handleEdit={handleEdit} /> :
                                            tab == 5 ?
                                                <Step5 profile={profile} setProfile={setProfile} handleEdit={handleEdit} /> :
                                                tab == 6 ?
                                                    <Step6 profile={profile} setProfile={setProfile} handleEdit={handleEdit} /> :
                                                    <Step7 profile={profile} setProfile={setProfile} handleEdit={handleEdit} />
                        }
                    </div>
                    <div className="profile-pop-bottom">
                        <div className="ppb-left">
                            {tab != 1 && <button className="ppb-previous" onClick={handlePrevious}>Pervious</button>}
                        </div>
                        <div className="ppb-right">
                            {tab == 5 && <button className="ppbr-skip" onClick={() => setTab(tab + 1)}>Skip </button>}
                            <div className="ppbr-save-next" onClick={handleNext}>
                                <div className="ppbr-sn-left">{tab == 3 ? "Complete Your Full Profile" : tab == 7 ? "Save" : "Save and Next"}</div>
                                {
                                    tab != 7 && <div className="ppbr-sn-right">
                                        <img src={rightArrow} alt="Right Arrow" />
                                    </div>
                                }
                            </div>
                            {tab == 3 && <button className="ppbr-skip" onClick={saveProfile}>Save </button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;