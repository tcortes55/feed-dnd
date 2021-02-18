import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase/firebase';
import { initialLoadDeck } from '../../PictureManager';
import { getUserId } from '../../firebase/feedIdManager';
import { UploadIcon } from '../icons/icons';
import loadImage from 'blueimp-load-image';
import styled from 'styled-components';

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

// const loadImgOptions = { 
//     // maxWidth: 100,
//     // maxHeight: 100,
//     // cover: true,
//     // crop: true,
//     // imageSmoothingEnabled: false,
//     // canvas: true,
//     orientation: true 
// };

function compress(source_img_obj, quality, output_format){
    console.log(source_img_obj);

    var mime_type = "image/jpeg";
    if(typeof output_format !== "undefined" && output_format=="png"){
        mime_type = "image/png";
    }
    
    var natW = source_img_obj.naturalWidth;
    var natH = source_img_obj.naturalHeight;
    console.log("w=" + natW + " h=" + natH);

    var maxWidth = 100;
    var offsetX = 0;
    var offsetY = 0;
    var ratio = natH / natW;

    console.log("ratio=" + ratio);

    if (ratio > 1) {
        natW = maxWidth;
        natH = ratio * maxWidth;
        console.log("w=" + natW + " h=" + natH);
        offsetY = (natH - natW) / 2 * (-1);
    }
    else {
        natH = maxWidth;
        natW = ratio * maxWidth;
        console.log("w=" + natW + " h=" + natH);
        offsetX = (natW - natH) / 2 * (-1);
    }

    console.log("offX=" + offsetX + " offY=" + offsetY);

    var cvs = document.createElement('canvas');
    cvs.width = maxWidth;
    cvs.height = maxWidth;

    var ctx = cvs.getContext("2d").drawImage(source_img_obj, offsetX, offsetY, natW, natH);
    var newImageData = cvs.toDataURL(mime_type, quality/100);
    return cvs;
}

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

function executeUpload(file, filename, imagePositions) {   
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
                        console.log(canvas);
                        document.body.appendChild(canvas);
                        imgURI = canvas.toDataURL("image/jpeg");
                        console.log(imgURI);
                        let imageFoo = new Image();
                        imageFoo.src = imgURI;
                        imageFoo.title = imageAsFile.name;

                        console.log(imageFoo.src);

                        imageFoo.onload = function() {
                            console.log(imageFoo)
                            let lala = compress(imageFoo, 100);
                            console.log(lala)
                            document.body.appendChild(lala);
                            let imgURI2 = lala.toDataURL("image/jpeg");
                            console.log(imgURI2)
                            alert(imgURI2);
                            fileFromCanvas = dataURItoBlob(imgURI2);
                            executeUpload(fileFromCanvas, imageAsFile.name, imagePositions);
                        }
                    },
                    { 
                        // maxWidth: 100,
                        // maxHeight: 100,
                        // cover: true,
                        // crop: true,
                        // imageSmoothingEnabled: false,
                        canvas: true,
                        orientation: true 
                    }
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