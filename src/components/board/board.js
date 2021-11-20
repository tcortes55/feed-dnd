import React, { useEffect, useState } from 'react';
import BoardSquare from '../boardSquare';
import Dustbin from '../dustbin';
import styled, { css } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import Carousel from '../carousel';
import LoginForm from '../loginForm';
import { Boards, AppColors } from '../../constants';
import Menu from '../menu';
import firebase from '../../firebase/firebase';
import { startUi, userIsAnon } from '../../firebase/firebase';
import { watchAuthContainer } from '../../firebase/customizations';
import { runBasicUpdate } from '../../PictureManager';

let DnDBackend = isMobile ? TouchBackend : HTML5Backend;

const BoardWrapper = styled.div`
    width: 100vw;
    height: 398px;
    margin: 0px;
    background-color: ${AppColors.LightRose};

    @media (min-width: 480px) {
        width: 252px !important;
        height: 100% !important;
        margin: auto;
    }
`;
const FeedWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 252px;
    margin: auto;
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

function Board({ imagePositions }) {
    const [loginFormVisibility, setLoginFormVisibility] = useState(false);

    function hideLoginForm() {
        setLoginFormVisibility(false);
    }

    function toggleLoginForm() {
        if (loginFormVisibility) {
            setLoginFormVisibility(false);
        }
        else {
            setLoginFormVisibility(true);

            if (userIsAnon()) {
                startUi(hideLoginForm);
            }
        }
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            hideLoginForm();
        });
        
        watchAuthContainer();
    }, []);

    const [selectedGrid, setSelectedGrid] = useState(imagePositions.template);

    function updateSelectedGrid(newSelection) {
        setSelectedGrid(newSelection);
        imagePositions.template = newSelection;
    }

    useEffect(() => {
        setSelectedGrid(imagePositions.template);
        runBasicUpdate();
    }, [imagePositions.template]);

    console.log("isMobile=" + isMobile);

    return (
        <DndProvider backend={DnDBackend}>
            <BoardWrapper>
                <FeedWrapper>{renderSquares(imagePositions, Boards.FEED, selectedGrid)}</FeedWrapper>
                <Carousel>{renderSquares(imagePositions, Boards.DECK, selectedGrid)}</Carousel>
                <LoginForm loginFormVisibility={loginFormVisibility} hideLoginForm={hideLoginForm}></LoginForm>
                <Menu imagePositions={imagePositions} selectedGrid={selectedGrid} updateSelectedGrid={updateSelectedGrid} toggleLoginForm={toggleLoginForm}></Menu>
                <Dustbin imagePositions={imagePositions}></Dustbin>
            </BoardWrapper>
        </DndProvider>
    );
}

export default Board;