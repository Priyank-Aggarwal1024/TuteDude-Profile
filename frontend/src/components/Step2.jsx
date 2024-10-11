import '../styles/Step2.css'
import education from '../assets/education.svg'
import { useState } from 'react';
function Step2({ profile, setProfile, handleEdit }) {
    const [institutionName, setInstitutionName] = useState(profile?.education?.institutionName || "");
    const [profession, setProfession] = useState(profile?.education?.profession || "");
    const [degree, setDegree] = useState(profile?.education?.degree || "-");
    const [year, setYear] = useState(profile?.education?.year || "");
    const [currentJobtitle, setCurrentJobtitle] = useState(profile?.education?.currentJobtitle || "");
    const professions = [
        "Student",
        "Graduate",
        "Working ",
        "Intern",
        "Freelancer"
    ]
    const degrees = [
        "B.Tech",
        "Intermediate",
        "BBA",
        "MBA",
        "M.Tech"
    ]
    const handleProfession = (item) => {
        setProfession(item)
        handleEdit("education")
        setProfile(() => ({ ...profile, education: { ...profile?.education, profession: item } }))
    }
    const handleInstitute = (e) => {
        setInstitutionName(e.target.value);
        handleEdit("education")
        setProfile(() => ({ ...profile, education: { ...profile?.education, institutionName: e.target.value } }))
    }
    const handleCurrentJob = ({ target }) => {
        setCurrentJobtitle(target.value);
        handleEdit("education")
        setProfile(() => ({ ...profile, education: { ...profile?.education, currentJobtitle: target.value } }))
    }
    const handleYear = ({ target }) => {
        setYear(target.value);
        handleEdit("education")
        setProfile(() => ({ ...profile, education: { ...profile?.education, year: Number(target.value) } }));
    }
    const handledegreeCourse = ({ target }) => {
        let deg = target.value + "-" + degree.split("-").slice(1).join("-");
        setDegree(deg);
        handleEdit("education")
        setProfile(() => ({ ...profile, education: { ...profile?.education, degree: deg } }));
    }
    const handleDegreeStream = ({ target }) => {
        let deg = degree.split("-")[0] + "-" + target.value;
        setDegree(deg);
        handleEdit("education")
        setProfile(() => ({ ...profile, education: { ...profile?.education, degree: deg } }));
    }
    return (
        <div className="step2 step">
            <div className="step-heading-div">
                <img src={education} alt="Education" />
                <h2 className="step-input-heading">Your Education & Professional Background?</h2>
            </div>
            <div className="step2-main">
                <div className="step2-main-row1">
                    <div className="input-outer-div-step21">
                        <div className="input-label">Your Profession</div>
                        <div className="profession-div">
                            {
                                professions.map((item, idx) => <div className={`${item == profession ? "select-profession" : "unselect-profession"}`} key={idx} onClick={() => handleProfession(item)} >{item}</div>)
                            }
                        </div>
                    </div><div className="input-outer-div">
                        <label htmlFor="institute" className="input-label">School /College/University</label>
                        <div className="input-div">
                            <input type="text" className="input" placeholder="eg.,  Meenakshi college of engineering, Kerla" id="institute" name="institute"
                                value={institutionName}
                                onChange={handleInstitute}
                            />
                        </div>
                    </div>
                </div>
                <div className="step2-main-row2">
                    <div className="input-outer-div">
                        <div className="input-label">Degree/Field of Study </div>
                        <div className="degree-div">

                            <div className="input-div" style={{ width: "40%" }}>
                                <select name="degree-course" className="input" id="degree-course"
                                    onChange={handledegreeCourse}
                                    defaultValue={degree.split("-")[0] || "B.Tech"}
                                >
                                    {
                                        degrees.map((item, idx) => <option
                                            key={idx}
                                            value={item}
                                        >
                                            {item}
                                        </option>)
                                    }
                                </select>
                            </div>
                            <div className="input-div" style={{ width: "60%" }}>
                                <input type="text" className="input" placeholder="Enter your Stream" id="streams" name="streams"
                                    value={degree.split("-").splice(1).join("-")}
                                    onChange={handleDegreeStream}
                                />

                            </div>
                        </div>
                    </div><div className="input-outer-div">
                        <label htmlFor="year" className="input-label">Graduation Year</label>
                        <div className="input-div">
                            <input type="number" step="1" value={year} className="input" placeholder="2070" id="year" name="year"
                                onChange={handleYear}
                            />
                        </div>
                    </div>
                </div>
                <div className="step2-main-row">
                    <div className="input-outer-div">
                        <label htmlFor="cureentJobtitle" className="input-label">Current Job Title/Company</label>
                        <div className="input-div">
                            <input type="text" className="input" placeholder="eg., UX Designer" id="cureentJobtitle" name="cureentJobtitle"
                                value={currentJobtitle}
                                onChange={handleCurrentJob}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Step2;