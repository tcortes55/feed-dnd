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

    var orderedPositions = imagePositions.sort(function (a, b) {
        return  a[0] > b[0] ? 1 : -1;
    })

    orderedPositions.forEach(imagePosition => {
        let position = imagePosition[0];
        let imagePath = imagePosition[1];

        let fill = position % 2 === 0;
        let picture = (imagePath != null && imagePath != undefined) ? <Picture imgPath={imagePath}></Picture> : null;

        squares.push(<Square key={position} fill={fill}>{picture}</Square>);
    });

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