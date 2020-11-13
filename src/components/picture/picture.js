import React from 'react'
import styled, { css } from 'styled-components';

const PictureWrapper = styled.div`
    height: 100px;
    width: 100px;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
`;

function Picture({ imgPath }) {
    return (
    <PictureWrapper>
        <Img src={imgPath}></Img>
    </PictureWrapper>
    );
}

export default Picture;