import React, { useEffect, useState } from 'react';
import firebase from '../../firebase/firebase';
import { handleSignout, userIsLoggedAndNotAnon } from '../../firebase/firebase';
import { CloseIcon } from '../icons/icons';
import { AppColors } from '../../constants';
import styled from 'styled-components';

const AuthInnerContainer = styled.div`
    background-color: ${AppColors.White};
    padding: 10px;
    margin: 30px;
`;

const AuthContainer = styled.div`
`;

const AuthWrapper = styled(AuthContainer)`
    .hidden {
        display: none;
    }

    .visible {
        background-color: ${AppColors.LightRoseTransparent};
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0px;
        z-index: 999;
    }
`;

const CloseButtonWrapper = styled.div`
    transform: translate(15px, -15px);
`;

function LoginForm({ loginFormVisibility, hideLoginForm }) {
    let isLoggedAndNotAnon = userIsLoggedAndNotAnon();
    
    function handleOutOfModalClick(e) {
        if(e.target !== e.currentTarget) {
            return;
        }

        hideLoginForm();
    }
    
    function handleCloseModalButtonClick(e) {
        hideLoginForm();
    }

    return (
        <AuthWrapper>
            <AuthContainer className={loginFormVisibility ? 'visible' : 'hidden'} onClick={handleOutOfModalClick}>
                <AuthInnerContainer>
                    <CloseButtonWrapper onClick={handleCloseModalButtonClick}>
                        <CloseIcon></CloseIcon>
                    </CloseButtonWrapper>
                    <div id ="firebaseui-auth-container"></div>
                    {isLoggedAndNotAnon && <div><button onClick={handleSignout}>SIGNOUT</button></div>}
                </AuthInnerContainer>
            </AuthContainer>
        </AuthWrapper>
    )
}

export default LoginForm;