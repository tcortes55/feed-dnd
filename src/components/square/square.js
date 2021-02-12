import React from 'react';
import styled, { css } from 'styled-components';

const FEED = "feed";
const DECK = "deck";

const SquareWrapper = styled.div`
    height: ${props => props.reduced ? "60px" : "100px"};
    width: ${props => props.reduced ? "60px" : "100px"};
    border: 2px solid white;
`;

function Square({ squareBackgroundColor, currBoard, children }) {
    return (
        <SquareWrapper reduced={currBoard === DECK} style={{ backgroundColor: squareBackgroundColor }}>
            {children}
        </SquareWrapper>
    );
}

export default Square;