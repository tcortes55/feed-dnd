import React, { Component } from "react";
import { TemplateBlankIcon, TemplateXIcon, TemplateDiagonalIcon } from '../../icons/icons';
import styled, { css } from 'styled-components';

function TemplateItem({ templateType, updateSelectedGrid, toggleItemList }){
    const TEMPLATE_BLANK = 'TEMPLATE_BLANK';
    const TEMPLATE_X = 'TEMPLATE_X';
    const TEMPLATE_DIAGONAL = 'TEMPLATE_DIAGONAL';

    function handleClick() {
        toggleItemList();
        updateSelectedGrid(templateType);
    }
    
    return (
        <div>
            {(templateType === TEMPLATE_BLANK) && 
            <div onClick={handleClick}>
                <TemplateBlankIcon></TemplateBlankIcon>
            </div>
            }
            {(templateType === TEMPLATE_X) && 
            <div onClick={handleClick}>
                <TemplateXIcon></TemplateXIcon>
            </div>
            }
            {(templateType === TEMPLATE_DIAGONAL) && 
            <div onClick={handleClick}>
                <TemplateDiagonalIcon></TemplateDiagonalIcon>
            </div>
            }
        </div>
    );
}

export default TemplateItem;