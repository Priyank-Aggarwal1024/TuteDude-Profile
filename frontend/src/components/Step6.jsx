import '../styles/Step6.css'
import certificateImg from '../assets/certificate.svg'
import { useState } from 'react';
function Step6({ profile, setProfile, handleEdit }) {
    const [certificates, setCertificates] = useState(profile?.certificates || [{}])

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const years = Array.from(
        { length: Math.ceil((2010 - 2050) / -1) },
        (_, i) => 2050 + i * -1
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
    const commonHandle = ({ target }, name) => {
        const [current, ...rest] = certificates;
        setCertificates(() => (
            [{ ...current, [name]: target.value }, ...rest]
        ));
        handleEdit("certificates")
        setProfile(() => ({ ...profile, certificates: [{ ...current, [name]: target.value }, ...rest] }))
    }
    const handleAlwaysValid = ({ target }) => {
        const [current, ...rest] = certificates;
        setCertificates(() => (
            [{ ...current, alwaysValid: target.checked || false }, ...rest]
        ));
        handleEdit("certificates")
        setProfile(() => ({ ...profile, certificates: [{ ...current, alwaysValid: target.checked }, ...rest] }))
    }
    const [error, setError] = useState("")
    const handleAddCertificate = () => {
        if (!certificates[0]?.name) {
            setError("Certificate name is required");
            alert("Certificate name is required");
        } else {
            setCertificates(() => ([{}, ...certificates]));
            setProfile(() => ({ ...profile, certificates: [{}, ...certificates] }));
        }

    }
    return (
        <div className="step6 step">
            <div className="step-heading-div">
                <img src={certificateImg} alt="Certificate Image" />
                <h2 className="step-input-heading">Certifications</h2>
            </div>
            <div className="input-outer-div">
                <label htmlFor="certificate-name" className="input-label">Certification name*</label>
                <div className="input-div">
                    <input type="text" className="input" placeholder="Please enter your certification name" id="certificate-name" name="certificate-name"
                        onChange={(e) => commonHandle(e, "name")}
                        value={certificates[0]?.name || ""}
                    />
                </div>
            </div>
            <div className="input-outer-div">
                <label htmlFor="certificate-url" className="input-label">Certification URL</label>
                <div className="input-div">
                    <input type="text" className="input" placeholder="Please mention your completion URL" id="certificate-url" name="certificate-url"
                        onChange={(e) => commonHandle(e, "url")}
                        value={certificates[0]?.url || ""}
                    />
                </div>
            </div>
            <div className="input-outer-div">
                <div htmlFor="certificate-url" className="input-label">Certification validity</div>
                <div className="certificate-validity">
                    <div className="validity-from">
                        <div className="input-div" style={{ width: "100%" }}>
                            <select name="cert-fromyear" className="input" id="cert-fromyear"
                                onChange={(e) => commonHandle(e, "validityFromYear")}
                                size={1}
                                defaultValue={certificates[0]?.validityFromYear || currentYear}
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
                        <div className="input-div" style={{ width: "100%" }}>
                            <select name="cert-frommonth" className="input" id="cert-frommonth"
                                onChange={(e) => commonHandle(e, "validityFromMonth")} size={1}
                                defaultValue={certificates[0]?.validityFromMonth || currentMonth}
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
                    <p className="cert-to-text">To</p>
                    <div className="validity-to">
                        <div className="input-div" style={{ width: "100%" }}>
                            <select name="cert-toear" className="input" id="cert-toyear"
                                onChange={(e) => commonHandle(e, "validityToYear")}
                                size={1}
                                defaultValue={certificates[0]?.validityToYear || currentYear}
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
                        <div className="input-div" style={{ width: "100%" }}>
                            <select name="cert-tomonth" className="input" id="cert-tomonth"
                                onChange={(e) => commonHandle(e, "validityToMonth")}
                                size={1}
                                defaultValue={certificates[0]?.validityToMonth || currentMonth}
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
            <div className="alwaysvalid-div">
                <input type="checkbox" id="alwaysValid" name="alwaysValid"
                    onChange={(e) => {
                        handleAlwaysValid(e);
                    }}
                    value={certificates[0]?.alwaysValid || false}
                />
                <label htmlFor="alwaysValid" className={`${certificates[0]?.alwaysValid ? "alwaysValid-input-checked" : "alwaysValid-input-unchecked"}`}></label>
                <label htmlFor="alwaysValid" className="alwaysValid-label">This certification does not expire</label>
            </div>
            <p className="add-certificate" onClick={handleAddCertificate}>Add another Certificate</p>
        </div >
    );
}

export default Step6;