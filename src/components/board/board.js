import React from 'react';
import BoardSquare from '../boardSquare';
import Dustbin from '../dustbin';
import styled, { css } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import Carousel from '../carousel';

let DnDBackend = isMobile ? TouchBackend : HTML5Backend;

const FeedWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 312px;
    margin: auto;
    margin-top: 25px;
`;
const DeckWrapper = styled.div`
    margin: auto;
    margin-top:50px;
    display: flex;
    max-width: 352px;
    overflow-x: scroll;
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
    if (!isMobile) {
        fullBoard.push(<DeckWrapper>{renderSquares(imagePositions, "deck")}</DeckWrapper>);
    }

    return fullBoard;
}

function Board({ imagePositions }) {
    return (
        <DndProvider backend={DnDBackend}>
            {renderBoard(imagePositions)}
            { isMobile && <Carousel>{renderSquares(imagePositions, "deck")}</Carousel> }
            <Dustbin></Dustbin>
        </DndProvider>
    );
}

export default Board;