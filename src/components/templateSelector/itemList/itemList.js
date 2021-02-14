import React, { Component } from "react";
import { Templates, AppColors } from '../../../constants';
import TemplateItem from '../templateItem';
import styled, { css } from 'styled-components';

const TemplateListContainer = styled.div`
    width: 306px;
    background-color: ${AppColors.DarkBlue};
    float: right;
    margin-right: 3px;
    margin-top: -159px;
`;

const TemplateList = styled.div`
    padding-inline: 0px;
    justify-content: space-between;
    display: flex;
    margin: 15px;
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