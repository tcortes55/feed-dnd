import React, { useState } from 'react';
import Square from '../square';
import Picture from '../picture';
import ItemTypes, { Templates, AppColors, Boards } from '../../constants';
import { moveImage, canMoveImage } from '../../PictureManager';
import { useDrop } from 'react-dnd';

function getTemplateBackground(selectedGrid, board, position) {
  if (board === Boards.DECK) {
    return AppColors.DarkGrey;
  }

  switch (selectedGrid) {
    case Templates.BLANK:
      return AppColors.DarkGrey;
    case Templates.X:
      if (position % 2 == 0) {
        return AppColors.LightGrey;
      }
      else {
        return AppColors.DarkGrey;
      }
    case Templates.DIAGONAL:
      switch (position) {
        case 0:
        case 5:
        case 7:
          return AppColors.MediumGrey;
        case 1:
        case 3:
        case 8:
          return AppColors.DarkGrey;
        case 2:
        case 4:
        case 6:
          return AppColors.LightGrey;
      }
  }
}

function BoardSquare({ imagePositions, board, position, imagePath, selectedGrid}) {
    const squareBackgroundColor = getTemplateBackground(selectedGrid, board, position);

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

    const layoverColor = AppColors.MediumBlue;

    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                // width: '100%',
                // height: '100%',
            }}
        >
        <Square key={position} currBoard={board} squareBackgroundColor={squareBackgroundColor}>{picture}</Square>
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
            backgroundColor: layoverColor,
          }}
        />
      )}
        </div>
    );
}

export default BoardSquare;