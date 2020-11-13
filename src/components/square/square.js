import React from 'react'
import styled, { css } from 'styled-components';

const SquareWrapper = styled.div`
    height: 100px;
    width: 100px;
    border: 2px solid white;
`;

function Square({ fill, children }) {
    const squareColor = fill ? 'darkgrey' : 'lightgrey';
    return (
        <SquareWrapper style={{ backgroundColor: squareColor }}>
            {children}
        </SquareWrapper>
    );
}

export default Square;