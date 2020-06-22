import Router from "../Router.js";
import View from "../components/View.js"

export default class WelcomeController extends View {
    layout() {
        super.layout();
        this.setupNav()
    }

    setupNav() {
        super.setupNav();
        let nav = document.querySelector('#navbar');
        nav.querySelector('#right-menu').innerHTML += `
            <a id="login-btn" class="ui item">Login</a>
            <a id="create-account-btn" class="ui item">Create Account</a>
        `;

        let loginBtn = document.querySelector('#login-btn');
        let createAccountBtn = document.querySelector('#create-account-btn');

        // Add event listeners
        loginBtn.addEventListener('click', e => Router.routeTo('/login'));
        createAccountBtn.addEventListener('click', e => Router.routeTo('/createaccount'));
    }

}