import '../styles/Step5.css'
import projectImg from '../assets/project.svg'
import { useEffect, useState } from 'react';
function Step5({ profile, setProfile, handleEdit }) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const [projects, setProjects] = useState(profile?.projects || [{}]);
    const commonHandle = ({ target }) => {
        const { value, name } = target;
        const [currProject, ...rest] = projects;
        handleEdit("projects")
        setProjects(() => ([{ ...currProject, [name]: value }, ...rest]));
        if (name === "projectDetails") {
            setCharLeft(() => (1000 - (value?.length || 0)))
        }
    }
    const [charLeft, setCharLeft] = useState(projects[0]?.projectDetails ? 1000 - projects[0]?.projectDetails.length : 1000);


    const years = Array.from(
        { length: Math.ceil((2010 - currentYear) / -1) },
        (_, i) => currentYear + i * -1
    );
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const addProject = () => {
        if (!projects[0]?.title) {
            alert("Project title is required");
        } else if (!projects[0]?.deliveredTo) {
            alert("Client/ Company field is required");
        } else if (!projects[0]?.projectDetails) {
            alert("Project Details field is required");
        } else if (!projects[0]?.workedFromYear) {
            alert("Worked from year field is required");
        } else if (!projects[0]?.workedFromMonth) {
            alert("Worked from month field is required");
        } else {
            setProjects([{}, ...projects]);
        }
    }
    const deleteProject = () => {
        const [currProj, ...rest] = projects;
        if (projects.length > 1) {
            setProjects(rest)
        }
    }
    useEffect(() => {
        setProfile(() => ({ ...profile, projects }))
    }, [projects]);
    return (
        <div className="step5 step">
            <div className="input-section">

                <div className="step-heading-div">
                    <img src={projectImg} alt="Project Image" />
                    <h2 className="step-input-heading">Project</h2>
                </div>
                <div className="project-outer-div">
                    <p className="project-label">Stand out for employers by adding details about projects you have done in college, internships, or at work</p>
                    <div className="input-outer-div">
                        <div htmlFor="title" className="input-label">Project Title*</div>
                        <div className="input-div">
                            <input type="text" className="input" placeholder="Enter project title" id="title" name="title" onChange={commonHandle}
                                value={projects[0]?.title || ""}
                            />
                        </div>
                    </div>
                    <div className="input-outer-div">
                        <div htmlFor="projectTag" className="input-label">Tag this project with your employment/education</div>
                        <div className="input-div">
                            <select className="input" id="projectTag" name="projectTag" onChange={commonHandle}
                                defaultValue={projects[0]?.projectTag || ""}
                            >
                                <option value="Select employment/education" disabled>Select employment/education</option>
                                <option value="employment">Employment</option>
                                <option value="education">Education</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-outer-div">
                        <div htmlFor="deliveredTo" className="input-label">Client/ Company*</div>
                        <div className="input-div">
                            <input type="text" className="input" placeholder="Enter client name" id="deliveredTo" name="deliveredTo" onChange={commonHandle}
                                value={projects[0]?.deliveredTo || ""}
                            />
                        </div>
                    </div>
                    <div className="input-project-status">
                        <label htmlFor="status" className="input-label">Project Status</label>
                        <div className="project-checkbox-div">
                            <div className="checkbox-div">
                                <input type="radio" name="status" className="proj-inp-stat" id="status-finish" value="finish"
                                    onChange={commonHandle}
                                    checked={projects[0]?.status === "finish" ? true : false}
                                />
                                <label htmlFor="status-finish" className="proj-check-label">Finished </label>
                            </div>
                            <div className="checkbox-div">
                                <input type="radio" name="status" className="proj-inp-stat" id="status-progress" value="progress"
                                    onChange={commonHandle}
                                    checked={projects[0]?.status === "progress" ? true : false}
                                />
                                <label htmlFor="status-progress" className="proj-check-label">In Progress</label>
                            </div>
                        </div>
                    </div>
                    <div className="input-outer-div">
                        <div className="input-label">Worked from*</div>
                        <div className="projects-validity">
                            <div className="validity-from">
                                <div className="input-div">
                                    <select name="workedFromYear" className="input" id="workedFromYear"
                                        onChange={commonHandle}
                                        defaultValue={projects[0]?.workedFromYear || currentYear}
                                    >
                                        {
                                            years.map((item, idx) => <option
                                                key={idx}
                                                value={item}
                                            >
                                                {item}
                                            </option>)
                                        }
                                    </select>
                                </div>
                                <div className="input-div">
                                    <select name="workedFromMonth" className="input" id="workedFromMonth"
                                        onChange={commonHandle} size={1}
                                        defaultValue={projects[0]?.workedFromMonth || currentMonth}
                                    >
                                        {
                                            months.map((item, idx) => <option
                                                key={idx}
                                                value={item}
                                            >
                                                {item}
                                            </option>)
                                        }
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="input-outer-div">
                        <div className="input-label">Worked To </div>
                        <div className="validity-to">
                            <div className="input-div">
                                <select name="workedToYear" className="input" id="workedToYear"
                                    onChange={commonHandle}
                                    defaultValue={projects[0]?.workedToYear || currentYear}
                                >
                                    {
                                        years.map((item, idx) => <option
                                            key={idx}
                                            value={item}
                                        >
                                            {item}
                                        </option>)
                                    }
                                </select>
                            </div>
                            <div className="input-div">
                                <select name="workedToMonth" className="input" id="workedToMonth"
                                    onChange={commonHandle}
                                    defaultValue={projects[0]?.workedToMonth || currentMonth}
                                >
                                    {
                                        months.map((item, idx) => <option
                                            key={idx}
                                            value={item}
                                        >
                                            {item}
                                        </option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="input-outer-div">
                        <div htmlFor="projectDetails" className="input-label">Details of project*</div>
                        <div className="input-div">
                            <textarea style={{ resize: "none" }} rows={3} maxLength={1000} type="text" className="input" placeholder="Type here..."
                                value={projects[0]?.projectDetails || ""}
                                id="projectDetails" name="projectDetails" onChange={commonHandle} />
                        </div>
                        <p className="project-maxlength">{charLeft} character(s) left</p>
                    </div>
                    <div className="project-handlers">
                        <p className="add-another-project" onClick={addProject}>Add another project</p>
                        <p className="delete-another-project" style={{ opacity: projects.length == 1 ? "0.5" : "1" }} onClick={deleteProject}>Delete</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Step5;