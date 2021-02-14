import React, { Component } from "react";
import { TemplateBlankIcon, TemplateXIcon, TemplateDiagonalIcon } from '../../icons/icons';
import { Templates } from '../../../constants';
import styled, { css } from 'styled-components';

const TemplateItemWrapper = styled.div`
    display: inline-block;
`;

function TemplateItem({ templateType, updateSelectedGrid, toggleItemList, isLarge }){
    function handleClick() {
        toggleItemList();
        updateSelectedGrid(templateType);
    }
    
    return (
        <TemplateItemWrapper>
            {(templateType === Templates.BLANK) && 
            <div onClick={handleClick}>
                <TemplateBlankIcon isLarge={isLarge}></TemplateBlankIcon>
            </div>
            }
            {(templateType === Templates.X) && 
            <div onClick={handleClick}>
                <TemplateXIcon isLarge={isLarge}></TemplateXIcon>
            </div>
            }
            {(templateType === Templates.DIAGONAL) && 
            <div onClick={handleClick}>
                <TemplateDiagonalIcon isLarge={isLarge}></TemplateDiagonalIcon>
            </div>
            }
        </TemplateItemWrapper>
    );
}

export default TemplateItem;