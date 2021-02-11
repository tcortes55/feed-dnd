import React, { Component } from "react";
import { TemplateBlankIcon, TemplateXIcon, TemplateDiagonalIcon } from '../../icons/icons';
import { Templates } from '../../../constants';
import styled, { css } from 'styled-components';

function TemplateItem({ templateType, updateSelectedGrid, toggleItemList }){
    function handleClick() {
        toggleItemList();
        updateSelectedGrid(templateType);
    }
    
    return (
        <div>
            {(templateType === Templates.BLANK) && 
            <div onClick={handleClick}>
                <TemplateBlankIcon></TemplateBlankIcon>
            </div>
            }
            {(templateType === Templates.X) && 
            <div onClick={handleClick}>
                <TemplateXIcon></TemplateXIcon>
            </div>
            }
            {(templateType === Templates.DIAGONAL) && 
            <div onClick={handleClick}>
                <TemplateDiagonalIcon></TemplateDiagonalIcon>
            </div>
            }
        </div>
    );
}

export default TemplateItem;