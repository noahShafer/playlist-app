import View from "../components/View.js";
import Router from "../Router.js";
import UserStore from "../stores/UserStore.js";

export default class LoginController extends View {

    layout() {
        super.layout()
        let view = document.querySelector('#app');
        this.setStyles();
        this.createLoginForm();
        this.setupNav();
    }

    setupNav() {
        super.setupNav();
        let nav = document.querySelector('#navbar');
        nav.querySelector('#right-menu').innerHTML += `
            <a id="create-account-btn" class="ui item">Create Account</a>
        `;

        let createAccountBtn = document.querySelector('#create-account-btn');

        // Add event listeners
        createAccountBtn.addEventListener('click', e => Router.routeTo('/createaccount'));
    }

    createLoginForm() {
        let view = document.querySelector('#app');
        view.innerHTML += `
            <div class="ui middle aligned center aligned grid">
            <div class="column">
                <h2 class="ui green image header">
                    <div class="content">
                        Log-in to your account
                    </div>
                </h2>
                <form id="login-form" class="ui large form">
                    <div class="ui stacked segment">
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="user icon"></i>
                                <input type="text" name="username" placeholder="username">
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="lock icon"></i>
                                <input type="password" name="password" placeholder="password">
                            </div>
                        </div>
                        <button class="ui fluid large green submit button" type="submit">Login</button>

                    </div>

                    <div class="ui error message"></div>

                </form>
            </div>
            </div>
        `;
        document.querySelector('#login-form').addEventListener('submit', e => {
            e.preventDefault();
            console.log(e.target.username.value)
            UserStore.shared.login(e.target.username.value, e.target.password.value).then(res => {
                console.log(res)
                if (res.logged_in == true) {
                    Router.routeTo('/home');
                }
            }); 
        });
    }

    setStyles() {
        document.querySelector('#page-styles').innerHTML = '<link rel="stylesheet" type="text/css" href="../src/styles/login.css">'
    }
}