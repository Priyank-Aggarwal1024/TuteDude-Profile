import '../styles/Step7.css'
import languageImg from '../assets/language.svg'
import { useEffect, useState } from 'react';
function Step7({ profile, setProfile, handleEdit }) {
    const [languages, setLanguages] = useState(profile?.languages || [{}]);
    const proficiency = ["beginner", "intermediate", "expert"];
    const commonHandle = ({ target }, name, index) => {
        handleEdit("languages")
        const tempLanguage = languages.map((item, idx) => {
            if (idx == index) {
                let obj = { ...item, [name]: target.value };
                return obj
            }
            return item
        })
        setLanguages(tempLanguage)
    }
    const handleAddLanguage = () => {
        let len = languages.length - 1;
        if (!languages[len]?.language) {
            alert("Before add new language fill all language field.")
        } else if (!languages[len]?.proficiency) {
            alert("Before add new language fill all proficiency field.")
        } else {
            handleEdit("languages")
            setLanguages(() => ([...languages, {}]))
        }
    }
    const handleDelete = (idx) => {
        if (languages.length != 1) {
            const tempLanguage = [...languages.slice(0, idx), ...languages.slice(idx + 1)]
            handleEdit("languages")
            setLanguages(tempLanguage);
        }
    }
    useEffect(() => {
        setProfile(() => ({ ...profile, languages }));
    }, [languages])
    return (
        <div className="step7 step">
            <div className="step-heading-div">
                <img src={languageImg} alt="Language" />
                <h2 className="step-input-heading">Languages</h2>
            </div>
            <div className="input-section">
                <div className="input-label">Strengthen your resume by letting recruiters know you can communicate in multiple languages</div>
                <div className="language-div">
                    {
                        languages.map((item, idx) => (
                            <div className="language-input-out" key={idx}>
                                <div className="language-input-outer">
                                    <div className="input-outer-div">
                                        <label htmlFor={`language-${idx}`} className="input-label">Language*</label>
                                        <div className="input-div">
                                            <input type="text" className="input" placeholder="Hindi" id={`language-${idx}`} name={`language-${idx}`}
                                                value={languages[idx]?.language || ""}
                                                onChange={(e) => commonHandle(e, "language", idx)} />
                                        </div>
                                    </div>
                                    <div className="input-outer-div">
                                        <label htmlFor={`proficiency-${idx}`} className="input-label">Proficiency*</label>
                                        <div className="input-div">
                                            <select type="text" className="input proficiency-input" placeholder="Expert" id={`proficiency-${idx}`} name={`proficiency-${idx}`}
                                                defaultValue={languages[idx]?.proficiency || ""}
                                                onChange={(e) => commonHandle(e, "proficiency", idx)}
                                            >
                                                {
                                                    proficiency.map((sitem, sidx) => (<option value={sitem} className="proficiency-opt" key={sidx}>{sitem}</option>))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <p className="language-delete" style={{ opacity: languages.length == 1 ? "0.5" : "1" }} onClick={() => handleDelete(idx)}>Delete</p>
                            </div>
                        ))
                    }
                    <p className="add-language" onClick={handleAddLanguage}>Add another language</p>
                </div>
            </div>
        </div>
    );
}

export default Step7;