import React from 'react';
import styled, { css } from 'styled-components';

const FEED = "feed";
const DECK = "deck";

const SquareWrapper = styled.div`
    height: 100px;
    width: 100px;
    border: 2px solid white;
`;

function Square({ fill, currBoard, children }) {
    const squareColor = currBoard === DECK ? 'black' : (fill ? 'darkgrey' : 'lightgrey');
    
    return (
        <SquareWrapper style={{ backgroundColor: squareColor }}>
            {children}
        </SquareWrapper>
    );
}

export default Square;