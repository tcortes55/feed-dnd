import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase/firebase';
import { initialLoadDeck } from '../../PictureManager';
import { getUserId } from '../../firebase/feedIdManager';
import styled from 'styled-components';

function UploadForm({ imagePositions }) {
    const [imagesAsFiles, setImagesAsFiles] = useState('');

    console.log(imagesAsFiles);
    const handleImageAsFile = (e) => {
        const images = e.target.files;
        setImagesAsFiles(images);
    }

    async function handleFirebaseUpload(e) {
        e.preventDefault();
        console.log('start of upload');

        // TODO: error handling
        if(Array.from(imagesAsFiles).some(function (item) { return item === '' })) {
            console.log(`Not an image`);
        }

        let feedId = getUserId();

        Array.from(imagesAsFiles).forEach(
            (imageAsFile) => {
                const uploadTask = storage.ref(`/images/${feedId}/${imageAsFile.name}`).put(imageAsFile);

                uploadTask.on('state_changed',
                (snapshot) => {
                    console.log(snapshot);
                },
                (err) => {
                    console.log(err);
                },
                async () => {
                    const firebaseUrl = await storage.ref('images').child(feedId).child(imageAsFile.name).getDownloadURL();
                    // setImagesAsUrls(prevArray => [...prevArray, firebaseUrl]);
                    initialLoadDeck(imagePositions, 0, firebaseUrl);
                    // uploadImages(prevArray => [...prevArray, firebaseUrl]);
                });
            }
        );
    }

    useEffect(() => {
        console.log('dentro do useEffect:');
        console.log(imagePositions);
    }, [imagePositions]);

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