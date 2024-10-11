import '../styles/Step4.css'
import bioImg from '../assets/bio.svg'
import jobImg from '../assets/portfolioIcon.svg'
import linkedinImg from '../assets/linkedin.svg'
import { useState } from 'react'
function Step4({ profile, setProfile, handleEdit }) {
    const [bio, setBio] = useState(profile?.bio || "");
    const [linkedin, setLinkedin] = useState(profile?.linkedin || "");
    const [preferredJobType, setPreferredJobType] = useState(profile?.preferredJobType || "");
    const [preferredWorkMode, setPreferredWorkMode] = useState(profile?.preferredWorkMode || "");

    const handleLinkedin = ({ target }) => {
        setLinkedin(target.value);
        handleEdit("linkedin")
        setProfile(() => ({ ...profile, linkedin: target.value }));
    }
    const handleBio = ({ target }) => {
        setBio(target.value);
        handleEdit("bio")
        setProfile(() => ({ ...profile, bio: target.value }));
    }
    const handlePjt = (item) => {
        setPreferredJobType(item);
        handleEdit("preferredJobType")
        setProfile(() => ({ ...profile, preferredJobType: item }));
    }
    const handleWm = (item) => {
        setPreferredWorkMode(item);
        handleEdit("preferredWorkMode")
        setProfile(() => ({ ...profile, preferredWorkMode: item }));
    }


    const clf = [
        "Internship",
        "Job",
        "Contract",
        "Freelance"
    ]
    const wm = [
        "In Office",
        "Hybrid",
        "Work from home"
    ]
    return (
        <div className="step4 step">
            <div className="input-section">

                <div className="step-heading-div">
                    <img src={bioImg} alt="Bio Image" />
                    <h2 className="step-input-heading">Your Short Bio</h2>
                </div>
                <div className="input-outer-div">
                    <label htmlFor="bio" className="input-label">It is the first thing recruiters notice in your profile. Write a concise headline introducing yourself to employers. (Minimum 5 words)|</label>
                    <div className="input-div">
                        <textarea rows={1} type="text" className="input" placeholder="Headline" id="bio" name="bio"
                            value={bio}
                            onChange={handleBio}
                        />
                    </div>
                </div>
            </div>
            <div className="input-section">
                <div className="step-heading-div">
                    <img src={jobImg} alt="Job Image" />
                    <h2 className="step-input-heading">Job</h2>
                </div>
                <div htmlFor="" className="input-label">Current Looking For</div>
                <div className="step4-clf-wm">
                    {
                        clf.map((item, idx) => (<div className={`${item == preferredJobType ? "step4-selected" : "step4-unselected"}`}
                            onClick={() => handlePjt(item)}
                            key={idx}>{item}</div>))
                    }
                </div>
                <div htmlFor="" className="input-label">Work Mode</div>
                <div className="step4-clf-wm">
                    {
                        wm.map((item, idx) => (<div className={`${item == preferredWorkMode ? "step4-selected" : "step4-unselected"}`}
                            onClick={() => handleWm(item)}
                            key={idx}>{item}</div>))
                    }
                </div>
            </div>
            <div className="input-section">
                <div className="step-heading-div">
                    <img src={linkedinImg} alt="Linkedin Image" />
                    <h2 className="step-input-heading">Add Your linkedin profile</h2>
                </div>
                <div className="input-outer-div">
                    <label htmlFor="linkedin" className="input-label">Add your profile link </label>
                    <div className="input-div">
                        <input type="text" className="input" placeholder="eg., https://salmaanahmed.com" id="linkedin" name="linkedin"
                            value={linkedin}
                            onChange={handleLinkedin}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Step4;