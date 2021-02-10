import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase/firebase';
import { initialLoadDeck } from '../../PictureManager';
import { getUserId } from '../../firebase/feedIdManager';
import { UploadIcon } from '../icons/icons';
import styled from 'styled-components';

const MenuItemWrapper = styled.div`
    width: 33%;
    display: inline-block;
`;

const FormContainer = styled.form`
    height: 100%;
    width: fit-content;
    margin: auto;
`;

function UploadForm({ imagePositions }) {
    const handleImageAsFile = (e) => {
        const imagesAsFiles = e.target.files;
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
                    initialLoadDeck(imagePositions, 0, firebaseUrl);
                });
            }
        );
    }

    useEffect(() => {
        console.log('dentro do useEffect:');
        console.log(imagePositions);
    }, [imagePositions]);

    return (
        <MenuItemWrapper>
            <FormContainer>
                <label>
                    <UploadIcon/>
                    <input
                        type="file"
                        multiple="multiple"
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