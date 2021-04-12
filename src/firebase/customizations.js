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

    // Options for the observer (which mutations to observe)
    var config = { attributes: true, childList: true };

    // Callback function to execute when mutations are observed
    var callback = function(mutationsList) {
        runAllCustomizations();
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    // observer.disconnect();
    
}