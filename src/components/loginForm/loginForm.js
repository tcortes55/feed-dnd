import React, { useEffect, useState } from 'react';
import { handleSignout, userIsLoggedAndNotAnon } from '../../firebase/firebase';
import { CloseIcon } from '../icons/icons';
import { AppColors } from '../../constants';
import styled from 'styled-components';

const AuthInnerContainer = styled.div`
    background-color: ${AppColors.White};
    padding: 10px;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 50%;
    transform: translateY(-25%);
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

const SignoutWrapper = styled.div`
    margin: auto;
    width: fit-content;
    padding: 30px;
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
                    {isLoggedAndNotAnon && <SignoutWrapper><button onClick={handleSignout}>SAIR</button></SignoutWrapper>}
                </AuthInnerContainer>
            </AuthContainer>
        </AuthWrapper>
    )
}

export default LoginForm;