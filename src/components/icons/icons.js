import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as DustbinIconSvg } from '../../assets/dustbin-icon.svg';
import { ReactComponent as GridIconSvg } from '../../assets/grid-icon.svg';
import { ReactComponent as PlusIconSvg } from '../../assets/plus-icon.svg';
import { ReactComponent as UserIconSvg } from '../../assets/user-icon.svg';
import { ReactComponent as XIconSvg } from '../../assets/x-icon.svg';

const CircleWrapper = styled.div`
    background-color: #e9d5bf;
    width: 60px;
    height: 60px;
    margin-top: -5px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
`;

export const DustbinIcon = () => {
    return (
        <CircleWrapper>
            <DustbinIconSvg fill='#031b23' stroke='#031b23' fontSize='1em' width='30px' style={{transform: `translateY(50%)`}}/>
        </CircleWrapper>
    )
}

function Icons() {
    return (
        <div></div>
    )
}

export default Icons;