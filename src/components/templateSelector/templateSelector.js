import React, { Component } from "react";
import { TemplateBlankIcon, TemplateXIcon, TemplateDiagonalIcon } from '../icons/icons';
import ItemList from './itemList';
import styled, { css } from 'styled-components';

const MenuItemWrapper = styled.div`
    width: 33.33333333%;
    display: inline-block;
    vertical-align: middle;
    max-height: 50px;
`;

function TemplateSelector({ selectedGrid, updateSelectedGrid }) {
    const TEMPLATE_BLANK = 'TEMPLATE_BLANK';
    const TEMPLATE_X = 'TEMPLATE_X';
    const TEMPLATE_DIAGONAL = 'TEMPLATE_DIAGONAL';

    // setTimeout(() => {
    //     updateSelectedGrid(TEMPLATE_X);
    // }, 1000);

    return (
        <MenuItemWrapper>
            {(selectedGrid === TEMPLATE_BLANK) && <TemplateBlankIcon></TemplateBlankIcon>}
            {(selectedGrid === TEMPLATE_X) && <TemplateXIcon></TemplateXIcon>}
            {(selectedGrid === TEMPLATE_DIAGONAL) && <TemplateDiagonalIcon></TemplateDiagonalIcon>}
            <ItemList updateSelectedGrid={updateSelectedGrid}></ItemList>
        </MenuItemWrapper>
    )
}

export default TemplateSelector;