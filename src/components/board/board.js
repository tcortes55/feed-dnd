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
    display: flex;
    max-width: 1000px;
`;

function renderSquares(imagePositions) {
    const squares = [];

    let numberOfPositions = Object.keys(imagePositions).length;

    for (var i = 0; i < numberOfPositions; i++) {
        let position = i;
        let imagePath = imagePositions[position];

        squares.push(<BoardSquare key={position + "_bs"} imagePositions={imagePositions} position={position} imagePath={imagePath}></BoardSquare>);
    }

    return squares;
}

function Board({ imagePositions }) {
    return (
        <DndProvider backend={DnDBackend}>
            <FeedWrapper>
                {renderSquares(imagePositions.feed)}
            </FeedWrapper>
            <DeckWrapper>
                {renderSquares(imagePositions.deck)}
            </DeckWrapper>
        </DndProvider>
    );
}

export default Board;