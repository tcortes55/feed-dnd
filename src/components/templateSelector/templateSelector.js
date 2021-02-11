import React, { Component, useState } from "react";
import { TemplateBlankIcon, TemplateXIcon, TemplateDiagonalIcon } from '../icons/icons';
import ItemList from './itemList';
import TemplateItem from './templateItem';
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

    const [itemListVisibility, setItemListVisibility] = useState(false);

    function toggleItemList() {
        if (itemListVisibility) {
            setItemListVisibility(false);
        }
        else {
            setItemListVisibility(true);
        }
    }

    // setTimeout(() => {
    //     updateSelectedGrid(TEMPLATE_X);
    // }, 1000);

    return (
        <MenuItemWrapper>
            <TemplateItem templateType={selectedGrid} updateSelectedGrid={updateSelectedGrid} toggleItemList={toggleItemList}></TemplateItem>
            {itemListVisibility && <ItemList updateSelectedGrid={updateSelectedGrid} toggleItemList={toggleItemList}></ItemList>}
        </MenuItemWrapper>
    )
}

export default TemplateSelector;