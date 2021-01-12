import React, {useState} from 'react';
import {storage} from '../../firebase/firebase';
import styled from 'styled-components';

function UploadForm() {
    const allInputs = {imgUrl: ''};
    const [imagesAsFiles, setImagesAsFiles] = useState('');
    const [imagesAsUrls, setImagesAsUrls] = useState(allInputs);

    console.log(imagesAsFiles);
    const handleImageAsFile = (e) => {
        const images = e.target.files;
        setImagesAsFiles(imageFiles => (images));
    }

    const handleFirebaseUpload = e => {
        e.preventDefault();
        console.log('start of upload');

        // TODO: error handling
        if(Array.from(imagesAsFiles).some(function (item) { return item === '' })) {
            console.log(`Not an image`);
        }

        const uploadTask = Array.from(imagesAsFiles).forEach(
            function (imageAsFile) {
                storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
            }
        );
        
    }

    return (
        <div>
            <form onSubmit={handleFirebaseUpload}>
                <input
                    type="file"
                    multiple="multiple"
                    onChange={handleImageAsFile}
                />
                <button>Upload</button>
            </form>
        </div>
    )
}

export default UploadForm;