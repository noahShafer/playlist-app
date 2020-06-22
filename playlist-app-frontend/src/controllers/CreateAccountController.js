import View from "../components/View.js";
import Router from "../Router.js";
import UserStore from "../stores/UserStore.js";

export default class CreateAccountController extends View {

    layout() {
        super.layout();
        let view = document.querySelector('#app');
        this.setStyles();
        this.createAccountForm();
        this.setupNav()
    }

    setupNav() {
        super.setupNav();
        let nav = document.querySelector('#navbar');
        nav.querySelector('#right-menu').innerHTML = `
            <a id="login-btn" class="ui item">Login</a>
        `;

        let loginBtn = document.querySelector('#login-btn');

        // Add event listeners
        loginBtn.addEventListener('click', e => Router.routeTo('/login'));
    }

    createAccountForm() {
        let view = document.querySelector('#app');
        view.innerHTML += `
            <div class="ui middle aligned center aligned grid">
            <div class="column">
                <h2 class="ui green image header">
                    <div class="content">
                        Create an Account
                    </div>
                </h2>
                <form id="create-account-form" class="ui large form">
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
        document.querySelector('#create-account-form').addEventListener('submit', e => {
            e.preventDefault();
            console.log(e.target.username.value)
            UserStore.shared.createUser(e.target.username.value, e.target.password.value).then(res => {
                console.log(res);
            })
        });
    }

    setStyles() {
        document.querySelector('#page-styles').innerHTML = '<link rel="stylesheet" type="text/css" href="../src/styles/login.css">'
    }
}