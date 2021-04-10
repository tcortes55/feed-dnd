import React, { useEffect, useState } from 'react';
import { UserIcon } from '../icons/icons';
import styled from 'styled-components';

const MenuItemWrapper = styled.div`
    width: 33.33333333%;
    display: inline-block;
    vertical-align: middle;
    max-height: 50px;
`;

const IconWrapper = styled.div`
    margin: auto;
    padding: 0px;
    width: fit-content;
    height: fit-content;
`;

function UserForm({ toggleLoginForm }) {
    function handleClick() {
        console.log("chamando toggle a partir do click")
        toggleLoginForm();
    }

    return (
        <MenuItemWrapper>
            <IconWrapper onClick={handleClick}>
                <UserIcon></UserIcon>
            </IconWrapper>
        </MenuItemWrapper>
    )
}

export default UserForm;