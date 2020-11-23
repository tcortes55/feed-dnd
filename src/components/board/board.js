import React from 'react'
import Square from '../square';
import Picture from '../picture';
import styled, { css } from 'styled-components';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend"
import { isMobile } from 'react-device-detect';

import { moveImage } from '../../PictureManager';

let DnDBackend = isMobile ? TouchBackend : HTML5Backend;

const BoardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 312px;
`;

function renderSquares(imagePositions) {
    const squares = [];

    let numberOfPositions = Object.keys(imagePositions).length;

    for (var i = 0; i < numberOfPositions; i++) {
        let position = i;
        let imagePath = imagePositions[position];

        let fill = position % 2 === 0;
        let picture = (imagePath != null && imagePath != undefined) ? <Picture imgPath={imagePath}></Picture> : null;

        squares.push(<div onClick={() => moveImage(imagePositions, position - 1, position)} ><Square key={position} fill={fill}>{picture}</Square></div>);
    }

    return squares;
}

function Board({ imagePositions }) {
    return (
        <BoardWrapper>
            {renderSquares(imagePositions)}
        </BoardWrapper>
    );
}

export default Board;