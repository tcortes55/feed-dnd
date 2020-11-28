import React from 'react';
import styled, { css } from 'styled-components';
import ItemTypes from '../../constants';
import { useDrag } from 'react-dnd';

const PictureWrapper = styled.div`
    height: 100px;
    width: 100px;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
`;

function Picture({ imgPath, currPosition }) {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.PICTURE,
            currPosition: currPosition
        },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    })

    return (
    <PictureWrapper
        ref={drag}
        style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
        <Img src={imgPath}></Img>
    </PictureWrapper>
    );
}

export default Picture;