import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase/firebase';
import { initialLoadDeck } from '../../PictureManager';
import { getUserId } from '../../firebase/feedIdManager';
import { UploadIcon } from '../icons/icons';
import loadImage from 'blueimp-load-image';
import styled from 'styled-components';
import { showLoader } from '../../util/loader';

const MenuItemWrapper = styled.div`
    width: 33.33333333%;
    display: inline-block;
    vertical-align: middle;
    max-height: 50px;
`;

const FormContainer = styled.form`
    height: 100%;
    width: fit-content;
    margin: auto;
`;

const loadImgOptions = { 
    maxWidth: 300,
    maxHeight: 300,
    cover: true,
    crop: true,
    imageSmoothingQuality: 'high',
    orientation: true 
};

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}

async function executeUpload(file, filename, imagePositions) {
    let feedId = getUserId();

    const uploadTask = storage.ref(`/images/${feedId}/${filename}`).put(file);

    uploadTask.on('state_changed',
    (snapshot) => {
        console.log(snapshot);
    },
    (err) => {
        console.log(err);
    },
    async () => {
        const firebaseUrl = await storage.ref('images').child(feedId).child(filename).getDownloadURL();
        initialLoadDeck(imagePositions, 0, firebaseUrl);
    });
}

function UploadForm({ imagePositions }) {
    const handleImageAsFile = (e) => {
        const imagesAsFiles = e.target.files;
        console.log('e.target.result');
        console.log(e.target.files[0]);
        handleFirebaseUpload(imagesAsFiles);
    }

    async function handleFirebaseUpload(imagesAsFiles) {
        showLoader();
        console.log('start of upload');

        // TODO: error handling
        if(Array.from(imagesAsFiles).some(function (item) { return item === '' })) {
            console.log(`Not an image`);
        }

        Array.from(imagesAsFiles).forEach(
            (imageAsFile) => {
                var imgURI;
                var fileFromCanvas;

                loadImage(
                    imageAsFile,
                    function (canvas) {
                        imgURI = canvas.toDataURL("image/jpeg");
                        fileFromCanvas = dataURItoBlob(imgURI);
                        executeUpload(fileFromCanvas, imageAsFile.name, imagePositions);
                    },
                    loadImgOptions
                );
            }
        );
    }

    return (
        <MenuItemWrapper>
            <FormContainer>
                <label>
                    <UploadIcon/>
                    <input
                        type="file"
                        multiple="multiple"
                        accept="image/*"
                        onChange={handleImageAsFile}
                        style={{
                            visibility: 'hidden',
                            height: '0px',
                            width: '0px',
                            position: 'absolute'
                        }}
                    />
                </label>
            </FormContainer>
        </MenuItemWrapper>
    )
}

export default UploadForm;