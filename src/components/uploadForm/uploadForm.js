import React, {useState} from 'react';
import {storage} from '../../firebase/firebase';
import styled from 'styled-components';

function UploadForm() {
    const [imagesAsFiles, setImagesAsFiles] = useState('');
    const [imagesAsUrls, setImagesAsUrls] = useState([]);

    console.log(imagesAsFiles);
    const handleImageAsFile = (e) => {
        const images = e.target.files;
        setImagesAsFiles(images);
    }

    const handleFirebaseUpload = e => {
        e.preventDefault();
        console.log('start of upload');

        // TODO: error handling
        if(Array.from(imagesAsFiles).some(function (item) { return item === '' })) {
            console.log(`Not an image`);
        }

        Array.from(imagesAsFiles).forEach(
            (imageAsFile) => {
                const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);

                uploadTask.on('state_changed',
                (snapshot) => {
                    console.log(snapshot);
                }, (err) => {
                    console.log(err);
                }, () => {
                    storage.ref('images').child(imageAsFile.name).getDownloadURL()
                    .then((firebaseUrl) => {
                        setImagesAsUrls([...imagesAsUrls, firebaseUrl]);
                        console.log(imagesAsUrls);
                    });
                });
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