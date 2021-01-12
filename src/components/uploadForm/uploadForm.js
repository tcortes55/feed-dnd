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
        setImagesAsFiles(imageFiles => (images))
    }

    return (
        <div>
            <form>
                <input
                    type="file"
                    multiple="multiple"
                    onChange={handleImageAsFile}
                />
            </form>
        </div>
    )
}

export default UploadForm;