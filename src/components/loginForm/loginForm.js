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

function LoginForm({ loginFormVisibility }) {
    let currentUser = firebase.auth().currentUser;
    let isLoggedAndNotAnon = currentUser && !currentUser.isAnonymous;
        
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