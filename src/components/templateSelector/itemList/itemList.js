import React, { Component } from "react";
import { Templates } from '../../../constants';
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
    padding-inline: 0px;
`;

function ItemList({ updateSelectedGrid, toggleItemList }) {
    return (
        <TemplateListContainer>
            <TemplateList>
                <TemplateItem templateType={Templates.BLANK} updateSelectedGrid={updateSelectedGrid} toggleItemList={toggleItemList}  isLarge={true}></TemplateItem>
                <TemplateItem templateType={Templates.X} updateSelectedGrid={updateSelectedGrid} toggleItemList={toggleItemList} isLarge={true}></TemplateItem>
                <TemplateItem templateType={Templates.DIAGONAL} updateSelectedGrid={updateSelectedGrid} toggleItemList={toggleItemList} isLarge={true}></TemplateItem>
            </TemplateList>
        </TemplateListContainer>
    );
}

export default ItemList;