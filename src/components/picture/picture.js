import React from 'react';
import styled, { css } from 'styled-components';
import ItemTypes, { Boards } from '../../constants';
import { useDrag } from 'react-dnd';

const PictureWrapper = styled.div`
    height: ${props => props.reduced ? "60px" : "100px"};
    width: ${props => props.reduced ? "60px" : "100px"};
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
`;

function Picture({ imgPath, currBoard, currPosition }) {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.PICTURE,
            currBoard: currBoard,
            currPosition: currPosition
        },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    })

    return (
    <PictureWrapper
        ref={drag}
        reduced={currBoard === Boards.DECK}
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