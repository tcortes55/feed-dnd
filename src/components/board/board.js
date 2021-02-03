import React from 'react';
import BoardSquare from '../boardSquare';
import Dustbin from '../dustbin';
import UploadForm from '../uploadForm';
import styled, { css } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import Carousel from '../carousel';

let DnDBackend = isMobile ? TouchBackend : HTML5Backend;

const BoardWrapper = styled.div`
    /* display: flex; */
    /* flex-wrap: wrap; */
    width: 100vw;
    height: 100vh;
    margin: 0px;
    background-color: #e9d5bf;
    /* margin: auto; */
    /* margin-top: 25px; */

    @media (min-width: 768px) {
        width: 352px !important;
        height: 800px !important;
        margin: auto;
    }
`;
const FeedWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 312px;
    margin: auto;
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
            <BoardWrapper>
                {renderBoard(imagePositions)}
                { isMobile && <Carousel>{renderSquares(imagePositions, "deck")}</Carousel> }
                <Dustbin imagePositions={imagePositions}></Dustbin>
                <UploadForm imagePositions={imagePositions}></UploadForm>
            </BoardWrapper>
        </DndProvider>
    );
}

export default Board;