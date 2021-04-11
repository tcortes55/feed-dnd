import React, { useEffect, useState } from 'react';
import firebase from '../../firebase/firebase';
import { handleSignout } from '../../firebase/firebase';
import styled from 'styled-components';

const AuthContainer = styled.div`
`;

const AuthWrapper = styled(AuthContainer)`
    .hidden {
        display: none;
    }
`;

function LoginForm({ loginFormVisibility, hideLoginForm }) {
    let currentUser = firebase.auth().currentUser;
    let isLoggedAndNotAnon = currentUser && !currentUser.isAnonymous;
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            hideLoginForm();
        });
    }, []);
        
    return (
        <AuthWrapper>
            <AuthContainer className={loginFormVisibility ? '' : 'hidden'}>
                <div id ="firebaseui-auth-container"></div>
                {isLoggedAndNotAnon && <div><button onClick={handleSignout}>SIGNOUT</button></div>}
            </AuthContainer>
        </AuthWrapper>
    )
}

export default LoginForm;