import React from 'react';
import Square from '../square';
import Picture from '../picture';
import ItemTypes from '../../constants';
import { moveImage, canMoveImage } from '../../PictureManager';
import { useDrop } from 'react-dnd';


function BoardSquare({ imagePositions, board, position, imagePath}) {
    let fill = position % 2 === 0;
    let picture = (imagePath != null && imagePath != undefined) ? <Picture imgPath={imagePath} currBoard={board} currPosition={position}></Picture> : null;

    const [{ isOver, getItem, canDrop }, drop] = useDrop({
        accept: ItemTypes.PICTURE,
        drop: () => {
          moveImage(imagePositions, getItem.currBoard, getItem.currPosition, board, position);
        },
        canDrop: () => {
          if (getItem)
            return canMoveImage(imagePositions, getItem.currBoard, getItem.currPosition, board, position);
          else
            return false;
        },
        collect: monitor => ({
        isOver: !!monitor.isOver(),
        getItem: monitor.getItem(),
        canDrop: !!monitor.canDrop()
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
        {isOver && canDrop && (
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