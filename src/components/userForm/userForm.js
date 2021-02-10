import React, { useEffect, useState } from 'react';
import { UserIcon } from '../icons/icons';
import styled from 'styled-components';

const MenuItemWrapper = styled.div`
    width: 33%;
    display: inline-block;
`;

function UserForm() {

    return (
        <MenuItemWrapper>
            <UserIcon></UserIcon>
        </MenuItemWrapper>
    )
}

export default UserForm;