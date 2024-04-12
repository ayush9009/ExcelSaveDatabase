import React, { useState } from 'react';
import { FiUpload, FiCheckCircle } from 'react-icons/fi';
import Button from '../components/Button';
import handleUpload from '../api';

export default function UploadArea() {
    const [fileToUpload, setFileToUpload] = useState(null);
    const [message, setMessage] = useState('Click Here to Add xlsx File');
    const [button, setButton] = useState(true);
   

    const handleChange = (data) => {
        const fileName = data.target.files.item(0).name;
        const fileType = data.target.files.item(0).type;
        const fileSize = data.target.files.item(0).size;

        if (fileSize > 26214400) {
            setMessage("File size greater than 25 MB!");
            setFileToUpload(null);
        } else if (fileType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setMessage("Invalid file type!");
            setFileToUpload(null);
        } else {
            setMessage(fileName);
            setFileToUpload(data.target.files[0]);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpload(fileToUpload)
            .then((data) => {
                if (data.success) {
                    setButton(false);
                    
                    setMessage("File uploaded successfully\nYour file will be processed shortly.");
                    setFileToUpload(null);
                }
            });
    }

    return (
        <div>
            <form className='absolute w-full h-80 flex flex-col items-center' onSubmit={handleSubmit}>
                <input className='h-full w-full opacity-0 cursor-pointer' type="file" name="xlsx" onChange={handleChange}/>
                {fileToUpload && <Button warning className="mb-3" type='submit'>Submit</Button>}
            </form>
            <div className='my-10 h-80 md:container bg-slate-200 rounded shadow-md flex flex-col justify-center'>
                {button && <FiUpload className='text-4xl mx-auto' />} {/* Render the upload icon */}
                {!button && <FiCheckCircle className='text-green-500 text-4xl mx-auto mb-3' />} {/* Render the tick icon */}
                <h2 className='text-2xl mx-auto whitespace-pre-line text-center'>
                {!button && <span className="text-red-500">Thank you</span>}{"\n"}
                    {message}
                </h2>
            </div>
        </div>
    )
}
