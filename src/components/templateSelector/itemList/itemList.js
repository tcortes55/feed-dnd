import React, { Component } from "react";
import { TemplateBlankIcon, TemplateXIcon, TemplateDiagonalIcon } from '../../icons/icons';
import styled, { css } from 'styled-components';

const TemplateListContainer = styled.div`
    width: 306px;
    height: 135px;
    background-color: darkviolet;
    float: right;
    margin-right: 3px;
    margin-top: -180px;
`;

const TemplateList = styled.ul`

`;

const TemplateItem = styled.li`
    list-style-type: none;
`;

function ItemList({ updateSelectedGrid }) {
    const TEMPLATE_BLANK = 'TEMPLATE_BLANK';
    const TEMPLATE_X = 'TEMPLATE_X';
    const TEMPLATE_DIAGONAL = 'TEMPLATE_DIAGONAL';


    return (
        <TemplateListContainer>
            <TemplateList>
                <TemplateItem value={TEMPLATE_BLANK}><TemplateBlankIcon/></TemplateItem>
                <TemplateItem value={TEMPLATE_X}><TemplateXIcon/></TemplateItem>
                <TemplateItem value={TEMPLATE_DIAGONAL}><TemplateDiagonalIcon/></TemplateItem>
            </TemplateList>
        </TemplateListContainer>
    );
}

export default ItemList;