//@ts-nocheck
import { LoadingButton } from '@mui/lab';
import React, { useRef } from 'react'

const FileButton = ({setFile,children,...other}) => {

    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => 
    {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) 
        {
            setFile(null);
            return;
        }

        console.log('fileObj is', fileObj);

        event.target.value = null;
        setFile(fileObj);
        console.log(event.target.files);

        console.log(fileObj);
        console.log(fileObj.name);
    };

    return (
        <div>
            <input
                style={{display: 'none'}}
                ref={inputRef}
                type="file"
                onChange={e => handleFileChange(e)}
            />
            <LoadingButton onClick={handleClick} {...other}>
                {children}
            </LoadingButton>
        </div>
    );
}

export default FileButton