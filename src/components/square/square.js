import React from 'react';
import { Boards } from '../../constants';
import styled, { css } from 'styled-components';

const SquareWrapper = styled.div`
    height: ${props => props.reduced ? "60px" : "100px"};
    width: ${props => props.reduced ? "60px" : "100px"};
    border: 2px solid white;
`;

function Square({ squareBackgroundColor, currBoard, children }) {
    return (
        <SquareWrapper reduced={currBoard === Boards.DECK} style={{ backgroundColor: squareBackgroundColor }}>
            {children}
        </SquareWrapper>
    );
}

export default Square;