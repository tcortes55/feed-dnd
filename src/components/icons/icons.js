import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as DustbinIconSvg } from '../../assets/dustbin-icon.svg';
import { ReactComponent as PlusIconSvg } from '../../assets/plus-icon.svg';
import { ReactComponent as UserIconSvg } from '../../assets/user-icon.svg';
import { ReactComponent as XIconSvg } from '../../assets/x-icon.svg';
import { ReactComponent as GridIcon1Svg } from '../../assets/grid-icon-1.svg';
import { ReactComponent as GridIcon2Svg } from '../../assets/grid-icon-2.svg';
import { ReactComponent as GridIcon3Svg } from '../../assets/grid-icon-3.svg';
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

const CloseCircleWrapper = styled.div`
    background-color: ${AppColors.Black}; //yellow;//#e9d5bf;
    width: 20px;
    height: 20px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    float: right;
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
        <UserIconSvg fill={AppColors.White} stroke={AppColors.White} width='30px'/>
    )
}

export const CloseIcon = () => {
    return (
        <CloseCircleWrapper>
            <XIconSvg fill={AppColors.White} stroke={AppColors.White}/>
        </CloseCircleWrapper>
    )
}

export function TemplateBlankIcon({ isLarge }) {
    const iconWidth = isLarge ? '80px' : '30px';

    return (
        <GridIcon1Svg width={iconWidth}/>
    )
}

export function TemplateXIcon({ isLarge }) {
    const iconWidth = isLarge ? '80px' : '30px';

    return (
        <GridIcon2Svg width={iconWidth}/>
    )
}

export function TemplateDiagonalIcon({ isLarge }) {
    const iconWidth = isLarge ? '80px' : '30px';

    return (
        <GridIcon3Svg width={iconWidth}/>
    )
}

function Icons() {
    return (
        <div></div>
    )
}

export default Icons;