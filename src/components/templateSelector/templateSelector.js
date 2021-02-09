import React, { Component } from "react";
import { TemplateBlankIcon, TemplateXIcon, TemplateDiagonalIcon } from '../icons/icons';
import styled, { css } from 'styled-components';

function TemplateSelector({ selectedGrid }) {
    const TEMPLATE_BLANK = 'TEMPLATE_BLANK';
    const TEMPLATE_X = 'TEMPLATE_X';
    const TEMPLATE_DIAGONAL = 'TEMPLATE_DIAGONAL';
    
    let lala = 'ESCOLHER';

    console.log(selectedGrid);

    switch (selectedGrid) {
        case TEMPLATE_BLANK:
            lala = TEMPLATE_BLANK;
            break;
        case TEMPLATE_X:
            lala = TEMPLATE_X;
            break;
        case TEMPLATE_DIAGONAL:
            lala = TEMPLATE_DIAGONAL;
            break;
    }
    console.log(selectedGrid);

    return (
        <div>{lala}</div>
    )
}

export default TemplateSelector;