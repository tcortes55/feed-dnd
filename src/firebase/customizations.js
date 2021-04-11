import { AppColors } from '../constants';

export function uiLocalization() {
    var emailLoginTitle = document.querySelector('[data-provider-id="password"] > span.firebaseui-idp-text-long');
    emailLoginTitle.innerText = "Login com e-mail";

    var anonymousLoginTitle = document.querySelector('[data-provider-id="anonymous"] > span.firebaseui-idp-text-long');
    anonymousLoginTitle.innerText = "Continuar como visitante";

    var authUiFooter = document.querySelector('div.firebaseui-card-footer');
    authUiFooter.parentNode.removeChild(authUiFooter);
}

export function customizeLayout() {
    var emailLoginButton = document.querySelector('[data-provider-id="password"]');
    emailLoginButton.style.backgroundColor = AppColors.MediumBlue;
    
    var anonymousLoginButton = document.querySelector('[data-provider-id="anonymous"]');
    anonymousLoginButton.style.backgroundColor = AppColors.MediumRose;
}