import React, { useEffect, useState } from 'react';
import BoardSquare from '../boardSquare';
import Dustbin from '../dustbin';
import styled, { css } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import Carousel from '../carousel';
import { Templates, Boards } from '../../constants';
import Menu from '../menu';
import { startUi } from '../../firebase/firebase';

let DnDBackend = isMobile ? TouchBackend : HTML5Backend;

const BoardWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0px;
    background-color: #e9d5bf;

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

function renderSquares(imagePositions, currBoard, selectedGrid) {
    const squares = [];

    let numberOfPositions = Object.keys(imagePositions[currBoard]).length;

    for (var i = 0; i < numberOfPositions; i++) {
        let position = i;
        let imagePath = imagePositions[currBoard][position];

        squares.push(<BoardSquare key={position + "_bs_" + currBoard} imagePositions={imagePositions} board={currBoard} position={position} imagePath={imagePath} selectedGrid={selectedGrid}></BoardSquare>);
    }

    return squares;
}

function renderBoard(imagePositions, selectedGrid) {
    const fullBoard = [];
    fullBoard.push(<FeedWrapper>{renderSquares(imagePositions, Boards.FEED, selectedGrid)}</FeedWrapper>);
    if (!isMobile) {
        fullBoard.push(<DeckWrapper>{renderSquares(imagePositions, Boards.DECK, selectedGrid)}</DeckWrapper>);
    }

    return fullBoard;
}

function Board({ imagePositions }) {

    useEffect(() => {
        startUi();
    });

    const [selectedGrid, setSelectedGrid] = useState(Templates.BLANK)

    function updateSelectedGrid(newSelection) {
        setSelectedGrid(newSelection);
    }

    return (
        <DndProvider backend={DnDBackend}>
            <BoardWrapper>
                {renderBoard(imagePositions, selectedGrid)}
                { isMobile && <Carousel>{renderSquares(imagePositions, Boards.DECK, selectedGrid)}</Carousel> }
                <div id ="firebaseui-auth-container"></div>
                <Menu imagePositions={imagePositions} selectedGrid={selectedGrid} updateSelectedGrid={updateSelectedGrid}></Menu>
                <Dustbin imagePositions={imagePositions}></Dustbin>
            </BoardWrapper>
        </DndProvider>
    );
}

export default Board;