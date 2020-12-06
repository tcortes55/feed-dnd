import React from 'react';
import BoardSquare from '../boardSquare';
import styled, { css } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';

let DnDBackend = isMobile ? TouchBackend : HTML5Backend;

const FeedWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 312px;
`;
const DeckWrapper = styled.div`
    margin-top:50px;
    display: flex;
    max-width: 1000px;
`;

function renderSquares(imagePositions, currBoard) {
    const squares = [];

    let numberOfPositions = Object.keys(imagePositions[currBoard]).length;

    for (var i = 0; i < numberOfPositions; i++) {
        let position = i;
        let imagePath = imagePositions[currBoard][position];

        squares.push(<BoardSquare key={position + "_bs_" + currBoard} imagePositions={imagePositions} board={currBoard} position={position} imagePath={imagePath}></BoardSquare>);
    }

    return squares;
}

function renderBoard(imagePositions) {
    const fullBoard = [];
    fullBoard.push(<FeedWrapper>{renderSquares(imagePositions, "feed")}</FeedWrapper>);
    fullBoard.push(<DeckWrapper>{renderSquares(imagePositions, "deck")}</DeckWrapper>);

    return fullBoard;
}

function Board({ imagePositions }) {
    return (
        <DndProvider backend={DnDBackend}>
            {renderBoard(imagePositions)}
        </DndProvider>
    );
}

export default Board;