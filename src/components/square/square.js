import React from 'react';
import { Boards } from '../../constants';
import styled, { css } from 'styled-components';

const SquareWrapper = styled.div`
    height: ${props => props.reduced ? "47px" : "79px"};
    width: ${props => props.reduced ? "47px" : "79px"};
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