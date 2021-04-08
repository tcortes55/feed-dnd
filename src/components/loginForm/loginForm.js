import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AuthContainer = styled.div`
`;

const AuthWrapper = styled(AuthContainer)`
    .hidden {
        display: none;
    }
`;

function LoginForm({ loginFormVisibility }) {

    return (
        <AuthWrapper>
            <AuthContainer id ="firebaseui-auth-container" className={loginFormVisibility ? '' : 'hidden'}></AuthContainer>
        </AuthWrapper>
    )
}

export default LoginForm;