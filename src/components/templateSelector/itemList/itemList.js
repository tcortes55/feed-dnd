import React, { Component } from "react";
import { TemplateBlankIcon, TemplateXIcon, TemplateDiagonalIcon } from '../../icons/icons';
import styled, { css } from 'styled-components';

const ItemListContainer = styled.div`
    width: 306px;
    height: 135px;
    background-color: darkviolet;
    float: right;
    margin-right: 3px;
    margin-top: -172px;
`;

function ItemList() {
    return (
        <ItemListContainer></ItemListContainer>
    );
}

export default ItemList;