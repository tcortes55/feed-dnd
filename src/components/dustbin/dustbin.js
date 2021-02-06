import React from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from '../../constants';
import { deleteImage } from '../../PictureManager';
import { DustbinIcon } from '../icons/icons';

function Dustbin({ imagePositions }) {
    const [{ isOver, canDrop, getItem }, drop] = useDrop({
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
        getItem: monitor.getItem(),
        canDrop: !!monitor.canDrop()
        }),
    });

    return (
        canDrop && <div
            ref={drop}
            style={{
                position: 'relative',
                width: '312px',
                height: '50px',
                margin: 'auto',
                backgroundColor: '#031b23',
                textAlign: 'center',
                // padding: '5px 0px 5px 0px'
                overflow: 'visible'
            }}
        >
            <DustbinIcon/>
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