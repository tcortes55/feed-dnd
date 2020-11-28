import React from 'react';
import Square from '../square';
import Picture from '../picture';
import ItemTypes from '../../constants';
import { moveImage } from '../../PictureManager';
import { useDrop } from 'react-dnd'


function BoardSquare({ imagePositions, position, imagePath}) {
    let fill = position % 2 === 0;
    let picture = (imagePath != null && imagePath != undefined) ? <Picture imgPath={imagePath}></Picture> : null;

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.PICTURE,
        drop: () => moveImage(imagePositions, position - 1, position),
        collect: monitor => ({
        isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                // width: '100%',
                // height: '100%',
            }}
        >
        <Square key={position} fill={fill}>{picture}</Square>
        {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
        </div>
    );
}

export default BoardSquare;