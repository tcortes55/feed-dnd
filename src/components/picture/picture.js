import React from 'react'
import styled, { css } from 'styled-components';
import ItemTypes from '../../constants'
import { useDrag } from 'react-dnd'

const PictureWrapper = styled.div`
    height: 100px;
    width: 100px;
`;

const Img = styled.img`
    width: 50%;
    height: 50%;
`;

function Picture({ imgPath }) {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.PICTURE },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    })

    return (
    <PictureWrapper
        ref={drag}
    >
        <Img src={imgPath}></Img>
    </PictureWrapper>
    );
}

export default Picture;