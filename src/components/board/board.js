import React from 'react'
import Square from '../square';
import Picture from '../picture';
import styled, { css } from 'styled-components';

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

        squares.push(<Square key={position} fill={fill}>{picture}</Square>);
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