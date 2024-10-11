import '../styles/Step1.css'
import location from '../assets/location.svg'
import skillImg from "../assets/skills.svg";
import search from "../assets/search.svg";
import add from '../assets/add.svg'
import cross from '../assets/cross.svg'
import { useState } from 'react';
function Step1({ profile, setProfile, handleEdit }) {

    const [state, setState] = useState(profile?.state || "");
    const [skills, setSkills] = useState(profile?.skills || ["UI/UX Design"]);
    const [skill, setSkill] = useState("");
    const tempSkills = ["Design", "Responsive Design", "Ux Research", "Visual Design", "Interaction Design"]
    const handleAddSkill = (skillvalue) => {
        if (skills.findIndex(item => skillvalue === item) == -1) {
            setSkills([...skills, skillvalue]);
            setProfile(() => ({ ...profile, skills: [...skills, skillvalue] }))
            handleEdit("skills")
            setSkill("")
        }
    }
    const handleRemoveSkill = (idx) => {
        const newSkills = [...skills.slice(0, idx), ...skills.slice(idx + 1)];
        setSkills(newSkills);
        handleEdit("skills")
        setProfile(() => ({ ...profile, skills: newSkills }))
    }
    return (
        <>
            <div className="step1 step">
                <div className="step1-live">
                    <div className="input-section">
                        <div className="step-heading-div">
                            <img src={location} alt="Location" />
                            <h2 className="step-input-heading">Where do you live?</h2>
                        </div>
                        <div className="input-outer-div">
                            <label htmlFor="state" className="input-label">Select State </label>
                            <div className="input-div">
                                <input type="text" className="input" placeholder="eg., Chennai" id="state" name="state" value={state} onChange={({ target }) => {
                                    setState(target.value)
                                    handleEdit("state")
                                    setProfile(() => ({ ...profile, state: target.value }))
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="input-section">
                        <div className="step-heading-div">
                            <img src={skillImg} alt="Skill" />
                            <h2 className="step-input-heading">What are your skills?</h2>
                        </div>
                        <div className="input-outer-div">
                            <label htmlFor="skill" className="input-label">Area(s) of interest </label>
                            <div className="input-div">
                                <img src={search} alt="Search" />
                                <input type="text" className="input" placeholder="Add your areas of expertise " id="skill" name="skill" value={skill}
                                    onChange={({ target }) => {
                                        setSkill(target.value)
                                        handleEdit("skills")
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleAddSkill(skill);
                                        }
                                    }} />
                                {
                                    skill && <img src={add} alt="Add" style={{ width: "20px", height: "20px" }} onClick={() => handleAddSkill(skill)} />
                                }
                            </div>
                        </div>
                        <div className="skills-div">
                            {
                                skills.map((item, idx) => <div className="skill-div-added" key={idx}>
                                    <span className="">{item}</span>
                                    <img src={cross} alt="cross" onClick={() => handleRemoveSkill(idx)} />
                                </div>)
                            }
                        </div>
                        <div className="input-outer-div">
                            <div className="input-label">Popular Career Interests</div>
                            <div className="skills-div">
                                {
                                    tempSkills.map((item, idx) => <div className="skill-div-unadded" key={idx}>
                                        <span className="">{item}</span>
                                        <img src={add} alt="Add" style={{ width: "14px", height: "14px" }} onClick={() => {
                                            handleAddSkill(item)
                                        }} />
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Step1;
