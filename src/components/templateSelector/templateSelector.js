import React, { Component } from "react";
import { TemplateBlankIcon, TemplateXIcon, TemplateDiagonalIcon } from '../icons/icons';
import styled, { css } from 'styled-components';

function TemplateSelector({ selectedGrid, updateSelectedGrid }) {
    const TEMPLATE_BLANK = 'TEMPLATE_BLANK';
    const TEMPLATE_X = 'TEMPLATE_X';
    const TEMPLATE_DIAGONAL = 'TEMPLATE_DIAGONAL';

    setTimeout(() => {
        updateSelectedGrid(TEMPLATE_X);
    }, 1000);

    return (
        <div>
            {(selectedGrid === TEMPLATE_BLANK) && <TemplateBlankIcon></TemplateBlankIcon>}
            {(selectedGrid === TEMPLATE_X) && <TemplateXIcon></TemplateXIcon>}
            {(selectedGrid === TEMPLATE_DIAGONAL) && <TemplateDiagonalIcon></TemplateDiagonalIcon>}
        </div>
    )
}

export default TemplateSelector;