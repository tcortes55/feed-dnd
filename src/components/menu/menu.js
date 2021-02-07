import React, { useEffect, useState } from 'react';
import UploadForm from '../uploadForm';
import styled from 'styled-components';

const MenuContainer = styled.div`
    position: relative;
    width: 312px;
    height: 50px;
    margin: auto;
    background-color: #031b23;
    text-align: center;
    overflow: visible;
`;

function Menu({ imagePositions }) {
    return (
        <MenuContainer>
            <UploadForm imagePositions={imagePositions}></UploadForm>
        </MenuContainer>
    )
}

export default Menu;