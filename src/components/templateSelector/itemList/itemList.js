import React, { Component } from "react";
// import { TemplateBlankIcon, TemplateXIcon, TemplateDiagonalIcon } from '../../icons/icons';
import TemplateItem from '../templateItem';
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

// const TemplateItem = styled.li`
//     list-style-type: none;
// `;

function handleClick(event) {
    console.log(event.target);
}

function ItemList({ updateSelectedGrid }) {
    const TEMPLATE_BLANK = 'TEMPLATE_BLANK';
    const TEMPLATE_X = 'TEMPLATE_X';
    const TEMPLATE_DIAGONAL = 'TEMPLATE_DIAGONAL';

    return (
        <TemplateListContainer>
            <TemplateList>
                <TemplateItem templateType={TEMPLATE_BLANK} updateSelectedGrid={updateSelectedGrid}></TemplateItem>
                <TemplateItem templateType={TEMPLATE_X} updateSelectedGrid={updateSelectedGrid}></TemplateItem>
                <TemplateItem templateType={TEMPLATE_DIAGONAL} updateSelectedGrid={updateSelectedGrid}></TemplateItem>
            </TemplateList>
        </TemplateListContainer>
    );
}

export default ItemList;