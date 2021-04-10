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

function LoginForm({ loginFormVisibility, toggleLoginForm }) {
    let currentUser = firebase.auth().currentUser;
    let isLoggedAndNotAnon = currentUser && !currentUser.isAnonymous;

    function handleSignout() {
        firebase.auth().signOut();
        // toggleLoginForm();
    }

    firebase.auth().onAuthStateChanged(function(user) {
        console.log("AuthChanged loginForm");
    });
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!(user && !user.isAnonymous))
            {
                console.log("startUi dentro do useEffect")
                startUi();
            }

            toggleLoginForm();
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