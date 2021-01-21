import React from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from '../../constants';

function Dustbin() {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.PICTURE,
        drop: () => {
            console.log("delete");
        //   moveImage(imagePositions, getItem.currBoard, getItem.currPosition, board, position);
        //   deleteImage();
        },
        // canDrop: () => {
        //   if (getItem)
        //     return canMoveImage(imagePositions, getItem.currBoard, getItem.currPosition, board, position);
        //   else
        //     return false;
        // },
        collect: monitor => ({
        isOver: !!monitor.isOver()
        // getItem: monitor.getItem(),
        // canDrop: !!monitor.canDrop()
        }),
    });

    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                width: '100%',
                height: '15%',
                bottom: '0px',
                backgroundColor: 'pink'
            }}
        >
            <div>Lixo</div>
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