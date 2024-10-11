import '../styles/Step3.css'
import doc from '../assets/doc.svg'
import portfolioIcon from '../assets/portfolioIcon.svg'
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadIcon from '../assets/uploadIcon.svg'
import axios from 'axios'
function Step3({ profile, setProfile, handleEdit }) {
    const [portfolio, setPortfolio] = useState(profile?.portfolio || "");
    const [resume, setResume] = useState(profile?.resume || "");
    const handlePortfolio = ({ target }) => {
        setPortfolio(target.value);
        handleEdit("portfolio")
        setProfile(() => ({ ...profile, portfolio: target.value }));
    }
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState('');
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.size > 10 * 1024 * 1024) {
            alert('File size exceeds 10MB. Please select a smaller file.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
        axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`,
            formData,
            {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            }
        )
            .then((response) => {
                setMessage(`File uploaded successfully! URL: ${response.data.secure_url}`);
                setResume(response.data.secure_url);
                console.log(response.data)
                handleEdit("resume")
                setProfile(() => ({ ...profile, resume: response.data.secure_url }))
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
                setMessage('Error uploading file.');
            });
    }, []);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'application/pdf': [], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [] } });
    return (
        <div className="step3 step">
            <div className="input-section">

                <div className="step-heading-div">
                    <img src={doc} alt="doc" />
                    <h2 className="step-input-heading">Upload your Resume / CV</h2>
                </div>
                <div className="input-outer-div">
                    <div className="input-label">Help us Get To know you better By sharing your resume.</div>
                    <div {...getRootProps({ className: 'dropzone resume-input' })}>
                        <input {...getInputProps()} />
                        <div className="upload-icon">

                            <img src={uploadIcon} alt="Upload Icon" />
                        </div>
                        <div className="click-upload">Click to upload or drag and drop</div>
                        <div className="click-upload">{uploadProgress}%</div>
                        <div className="acceptable-files"> Acceptable file types :  PDF,DOCX only ( MAX : 10mb)</div>
                    </div>
                </div>
            </div><div className="input-section">

                <div className="step-heading-div">
                    <img src={portfolioIcon} alt="Portfolio Icon" />
                    <h2 className="step-input-heading">Your Portfolio</h2>
                </div>
                <div className="input-outer-div">
                    <label htmlFor="portfolio" className="input-label">Add your portfolio link </label>
                    <div className="input-div">
                        <input type="text" className="input" placeholder="eg., https://salmaanahmed.com" id="portfolio" name="portfolio"
                            value={portfolio}
                            onChange={handlePortfolio}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Step3;