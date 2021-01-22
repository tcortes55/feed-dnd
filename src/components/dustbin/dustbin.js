import React from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from '../../constants';
import { deleteImage } from '../../PictureManager';

function Dustbin({ imagePositions }) {
    const [{ isOver, getItem }, drop] = useDrop({
        accept: ItemTypes.PICTURE,
        drop: () => {
            deleteImage(imagePositions, getItem.currBoard, getItem.currPosition);
        },
        // canDrop: () => {
        //   if (getItem)
        //     return canMoveImage(imagePositions, getItem.currBoard, getItem.currPosition, board, position);
        //   else
        //     return false;
        // },
        collect: monitor => ({
        isOver: !!monitor.isOver(),
        getItem: monitor.getItem()
        // canDrop: !!monitor.canDrop()
        }),
    });

    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                width: '100%',
                height: '100px',
                marginTop: '20px',
                bottom: '0px',
                backgroundColor: 'pink'
            }}
        >
            <div>MOVE IMAGE HERE TO DELETE IT</div>
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
    )
}

export default Dustbin;