import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase/firebase';
import { initialLoadDeck } from '../../PictureManager';
import { getUserId } from '../../firebase/feedIdManager';
import { UploadIcon } from '../icons/icons';
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

function compress(source_img_obj, quality, maxWidth, output_format){
    console.log(source_img_obj);

    var mime_type = "image/jpeg";
    if(typeof output_format !== "undefined" && output_format=="png"){
        mime_type = "image/png";
    }

    maxWidth = maxWidth || 100;
    var natW = source_img_obj.naturalWidth;
    var natH = source_img_obj.naturalHeight;
    var ratio = natH / natW;
    if (natW > maxWidth) {
        natW = maxWidth;
        natH = ratio * maxWidth;
    }

    var cvs = document.createElement('canvas');
    cvs.width = natW;
    cvs.height = natH;

    var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0, natW, natH);
    var newImageData = cvs.toDataURL(mime_type, quality/100);
    return cvs;
    var result_image_obj = new Image();
    result_image_obj.src = newImageData;
    return result_image_obj;
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

        let feedId = getUserId();

        Array.from(imagesAsFiles).forEach(
            (imageAsFile) => {

                // COMPRESS IMAGE AND SET RATIO 1:1 HERE
                console.log('before compress');
                console.log(imageAsFile);

                var imageObj = new Image();
                imageObj.title = imageAsFile.name;
                imageObj.src = URL.createObjectURL(imageAsFile);
                console.log('imageObj');
                console.log(imageObj);
                
                var lala2 = imageObj;// compress(imageObj, 80, 200);
                console.log('lala2');
                console.log(lala2);

                // var canvas = document.getElementById('myCanvas');
                // var context = canvas.getContext('2d');
                var lala3;
                lala2.onload = function() {
                    // context.drawImage(lala2, 0, 0, 200, 100);
                    // console.log('canvas:');
                    // lala3 = canvas.toDataURL("image/jpeg");
                    var canvas4 = compress(lala2, 80, 100);
                    lala3 = canvas4.toDataURL("image/jpeg");

                    var fileFromCanvas = dataURItoBlob(lala3)
                    
                    const uploadTask = storage.ref(`/images/${feedId}/${imageAsFile.name}`).put(fileFromCanvas);

                    uploadTask.on('state_changed',
                    (snapshot) => {
                        console.log(snapshot);
                    },
                    (err) => {
                        console.log(err);
                    },
                    async () => {
                        const firebaseUrl = await storage.ref('images').child(feedId).child(imageAsFile.name).getDownloadURL();
                        initialLoadDeck(imagePositions, 0, firebaseUrl);
                    });
                };
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