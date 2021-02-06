import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as DustbinIconSvg } from '../../assets/dustbin-icon.svg';
import { ReactComponent as GridIconSvg } from '../../assets/grid-icon.svg';
import { ReactComponent as PlusIconSvg } from '../../assets/plus-icon.svg';
import { ReactComponent as UserIconSvg } from '../../assets/user-icon.svg';
import { ReactComponent as XIconSvg } from '../../assets/x-icon.svg';

export const DustbinIcon = () => {
    return (
        <DustbinIconSvg fill='#e9d5bf' stroke='#e9d5bf' fontSize='1em' width='50px'/>
    )
}

function Icons() {
    return (
        <div></div>
    )
}

export default Icons;