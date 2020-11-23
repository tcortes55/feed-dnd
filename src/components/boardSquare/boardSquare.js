import React from 'react';
import Square from '../square';
import Picture from '../picture';

function BoardSquare({ position, imagePath}) {
    let fill = position % 2 === 0;
    let picture = (imagePath != null && imagePath != undefined) ? <Picture imgPath={imagePath}></Picture> : null;

    return (
        <Square key={position} fill={fill}>{picture}</Square>
    );
}

export default BoardSquare;