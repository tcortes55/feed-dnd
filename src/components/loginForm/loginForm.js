import React, { useEffect, useState } from 'react';
import firebase from '../../firebase/firebase';
import { handleSignout, userIsLoggedAndNotAnon } from '../../firebase/firebase';
import styled from 'styled-components';

const AuthInnerContainer = styled.div`
    background-color: #FFFFFF;
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
        background-color: rgb(0, 0, 0, 0.5);
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0px;
        z-index: 999;
    }
`;

function LoginForm({ loginFormVisibility, hideLoginForm }) {
    let isLoggedAndNotAnon = userIsLoggedAndNotAnon();
    
    function handleModalClick(e) {
        if(e.target !== e.currentTarget) {
            return;
        }

        hideLoginForm();
    }

    return (
        <AuthWrapper>
            <AuthContainer className={loginFormVisibility ? 'visible' : 'hidden'} onClick={handleModalClick}>
                <AuthInnerContainer>
                    <div id ="firebaseui-auth-container"></div>
                    {isLoggedAndNotAnon && <div><button onClick={handleSignout}>SIGNOUT</button></div>}
                </AuthInnerContainer>
            </AuthContainer>
        </AuthWrapper>
    )
}

export default LoginForm;