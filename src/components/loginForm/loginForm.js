import React, { useEffect, useState } from 'react';
import firebase from '../../firebase/firebase';
import { startUi } from '../../firebase/firebase';
import styled from 'styled-components';

const AuthContainer = styled.div`
`;

const AuthWrapper = styled(AuthContainer)`
    .hidden {
        display: none;
    }
`;

function LoginForm({ loginFormVisibility }) {
    let currentUser = firebase.auth().currentUser;
    let isLoggedAndNotAnon = currentUser && !currentUser.isAnonymous;
    
    useEffect(() => {
        if (!isLoggedAndNotAnon)
        {
            console.log("startUi dentro do useEffect")
            startUi();
        }
    }, []);

    return (
        <AuthWrapper>
            <AuthContainer className={loginFormVisibility ? '' : 'hidden'}>
                <div id ="firebaseui-auth-container"></div>
                {isLoggedAndNotAnon && <div>SIGNOUT</div>}
            </AuthContainer>
        </AuthWrapper>
    )
}

export default LoginForm;