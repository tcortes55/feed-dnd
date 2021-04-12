import { AppColors } from '../constants';

export function uiLocalization() {
    console.log("dentro do uiLocalization")
    var emailLoginTitle = document.querySelector('[data-provider-id="password"] > span.firebaseui-idp-text-long');
    if (emailLoginTitle) {
        emailLoginTitle.innerText = "Login com e-mail";
    }

    var anonymousLoginTitle = document.querySelector('[data-provider-id="anonymous"] > span.firebaseui-idp-text-long');
    if (anonymousLoginTitle) {
        anonymousLoginTitle.innerText = "Continuar como visitante";
    }

    var authUiFooter = document.querySelector('div.firebaseui-card-footer');
    if (authUiFooter) {
        authUiFooter.parentNode.removeChild(authUiFooter);
    }

    var emailLoginFormTitle = document.querySelector('h1.firebaseui-title');
    if (emailLoginFormTitle) {
        emailLoginFormTitle.innerText = "Login com e-mail";
    }

    var passwordInputLabel = document.querySelector('[for="ui-sign-in-password-input"]');
    if (passwordInputLabel) {
        passwordInputLabel.innerText = "Senha";
    }

    var newPasswordInputLabel = document.querySelector('[for="ui-sign-in-new-password-input"]');
    if (newPasswordInputLabel) {
        newPasswordInputLabel.innerText = "Nova senha";
    }

    var passwordErrorMessage = document.querySelector('p.firebaseui-id-password-error');
    console.log("password error antes")
    if (passwordErrorMessage) {
        console.log("password error depois")
        passwordErrorMessage.innerText = "Senha incorreta";
    }

    var submitButton = document.querySelector('button.firebaseui-id-submit');
    if (submitButton) {
        if (submitButton.innerText === "NEXT") {
            submitButton.innerText = "CONTINUAR";
        }
        else if (submitButton.innerText === "SIGN IN") {
            submitButton.innerText = "LOGIN";
        }
        else if (submitButton.innerText === "SEND") {
            submitButton.innerText = "ENVIAR";
        }
        else if (submitButton.innerText === "SAVE") {
            submitButton.innerText = "SALVAR";
        }
    }

    var cancelButton = document.querySelector('button.firebaseui-id-secondary-link');
    if (cancelButton) {
        if (cancelButton.innerText === "CANCEL") {
            cancelButton.innerText = "CANCELAR";
        }
    }

    var resetPasswordLink = document.querySelector('div.firebaseui-form-links > a.firebaseui-link');
    if (resetPasswordLink) {
        if (resetPasswordLink.innerText === "Trouble signing in?") {
            resetPasswordLink.innerText = "Problemas com o login?";
        }
    }

    var resetPasswordInstructions = document.querySelector('div.firebaseui-card-content > p.firebaseui-text');
    if (resetPasswordInstructions) {
        if (resetPasswordInstructions.innerText === "Get instructions sent to this email that explain how to reset your password") {
            resetPasswordInstructions.innerText = "As instruções para reset da senha serão enviadas para este e-mail";
        }
    }
}

export function customizeLayout() {
    console.log("dentro do customizeLayout")
    var emailLoginButton = document.querySelector('[data-provider-id="password"]');
    if (emailLoginButton) {
        emailLoginButton.style.backgroundColor = AppColors.MediumBlue;
    }
    
    var anonymousLoginButton = document.querySelector('[data-provider-id="anonymous"]');
    if (anonymousLoginButton) {
        anonymousLoginButton.style.backgroundColor = AppColors.MediumRose;
    }
}

export function runAllCustomizations() {
    uiLocalization();
    customizeLayout();
}

export function watchAuthContainer() {
    var targetNode = document.getElementById('firebaseui-auth-container');

    var config = { attributes: true, childList: true };

    var callback = function(mutationsList) {
        runAllCustomizations();
    };

    var observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
}