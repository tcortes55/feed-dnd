import React, { useEffect, useState } from 'react';
import UploadForm from '../uploadForm';
import TemplateSelector from '../templateSelector';
import UserForm from '../userForm';
import { useDrop } from 'react-dnd';
import ItemTypes from '../../constants';
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

function Menu({ imagePositions, selectedGrid, updateSelectedGrid }) {
    const [{ canDrop }] = useDrop({
        accept: ItemTypes.PICTURE,
        // drop: () => {
        //     deleteImage(imagePositions, getItem.currBoard, getItem.currPosition);
        // },
        // canDrop: () => {
        //   if (getItem)
        //     return canMoveImage(imagePositions, getItem.currBoard, getItem.currPosition, board, position);
        //   else
        //     return false;
        // },
        collect: monitor => ({
            canDrop: !!monitor.canDrop()
        }),
    });
    
    return (
        !canDrop && <MenuContainer>
            <UserForm></UserForm>
            <UploadForm imagePositions={imagePositions}></UploadForm>
            <TemplateSelector selectedGrid={selectedGrid} updateSelectedGrid={updateSelectedGrid}></TemplateSelector>
        </MenuContainer>
    )
}

export default Menu;