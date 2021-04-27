import React, { useEffect, useState } from 'react';
import { handleSignout, userIsLoggedAndNotAnon } from '../../firebase/firebase';
import { CloseIcon } from '../icons/icons';
import { AppColors } from '../../constants';
import { showLoader } from '../../util/loader';
import styled from 'styled-components';

const AuthInnerContainer = styled.div`
    background-color: ${AppColors.White};
    padding: 10px;
    /* margin-left: 30px;
    margin-right: 30px; */
    margin-top: 15%;
    /* transform: translateY(-25%); */
    transform: scale(0.79);
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

const SignOutWrapper = styled.div`
    margin: auto;
    width: fit-content;
    padding: 30px;
`;

const SignOutButton = styled.button`
    background-color: ${AppColors.MediumRose};
`;

const ButtonLabel = styled.span`
    padding: 0px;
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

    function handleSignOutButtonClick() {
        showLoader();
        handleSignout();
    }

    return (
        <AuthWrapper>
            <AuthContainer className={loginFormVisibility ? 'visible' : 'hidden'} onClick={handleOutOfModalClick}>
                <AuthInnerContainer>
                    <CloseButtonWrapper onClick={handleCloseModalButtonClick}>
                        <CloseIcon></CloseIcon>
                    </CloseButtonWrapper>
                    <div id ="firebaseui-auth-container"></div>
                    {isLoggedAndNotAnon && <SignOutWrapper>
                        <SignOutButton onClick={handleSignOutButtonClick} className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-anonymous firebaseui-id-idp-button">
                            <ButtonLabel className="firebaseui-idp-text firebaseui-idp-text-long">
                                SAIR
                            </ButtonLabel>
                        </SignOutButton>
                    </SignOutWrapper>}
                </AuthInnerContainer>
            </AuthContainer>
        </AuthWrapper>
    )
}

export default LoginForm;