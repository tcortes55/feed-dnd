import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as DustbinIconSvg } from '../../assets/dustbin-icon.svg';
import { ReactComponent as GridIconSvg } from '../../assets/grid-icon.svg';
import { ReactComponent as PlusIconSvg } from '../../assets/plus-icon.svg';
import { ReactComponent as UserIconSvg } from '../../assets/user-icon.svg';
import { ReactComponent as XIconSvg } from '../../assets/x-icon.svg';
import { AppColors } from '../../constants';

const CircleWrapper = styled.div`
    background-color: ${AppColors.LightRose}; //yellow;//#e9d5bf;
    width: 60px;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    transform: translateY(-5px);
`;

export const DustbinIcon = () => {
    return (
        <CircleWrapper>
            <DustbinIconSvg fill={AppColors.DarkBlue} stroke={AppColors.DarkBlue} width='30px' style={{transform: `translateY(50%)`}}/>
        </CircleWrapper>
    )
}

export const UploadIcon = () => {
    return (
        <CircleWrapper>
            <PlusIconSvg fill={AppColors.DarkBlue} stroke={AppColors.DarkBlue} width='30px' style={{transform: `translateY(55%)`}}/>
        </CircleWrapper>
    )
}

export const UserIcon = () => {
    return (
        <UserIconSvg fill={AppColors.White} stroke={AppColors.LightRose} width='30px'/>
    )
}

export function TemplateBlankIcon({ isLarge }) {
    const iconWidth = isLarge ? '80px' : '30px';

    return (
        <GridIconSvg fill='red' stroke='red' width={iconWidth}/>
    )
}

export function TemplateXIcon({ isLarge }) {
    const iconWidth = isLarge ? '80px' : '30px';

    return (
        <GridIconSvg fill='green' stroke='green' width={iconWidth}/>
    )
}

export function TemplateDiagonalIcon({ isLarge }) {
    const iconWidth = isLarge ? '80px' : '30px';

    return (
        <GridIconSvg fill='blue' stroke='blue' width={iconWidth}/>
    )
}

function Icons() {
    return (
        <div></div>
    )
}

export default Icons;