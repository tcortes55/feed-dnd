import React from 'react';
import styled, { css } from 'styled-components';

const FEED = "feed";
const DECK = "deck";

const SquareWrapper = styled.div`
    height: ${props => props.reduced ? "60px" : "100px"};
    width: ${props => props.reduced ? "60px" : "100px"};
    border: 2px solid white;
`;

function Square({ fill, currBoard, children }) {
    const squareColor = currBoard === DECK ? '#575757' : (fill ? 'darkgrey' : 'lightgrey');
    
    return (
        <SquareWrapper reduced={currBoard === DECK} style={{ backgroundColor: squareColor }}>
            {children}
        </SquareWrapper>
    );
}

export default Square;