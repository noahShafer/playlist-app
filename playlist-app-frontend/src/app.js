import navbar from "./components/Navbar.js";
import Router from "./Router.js";
import UserStore from "./stores/UserStore.js";


const BASE_URL = "http://localhost:3000";

window.addEventListener('load', e => {

    // Setting up navbar and main app div
    document.querySelector('html').innerHTML = navbar;
    document.querySelector('head').innerHTML += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">';
    document.querySelector('head').innerHTML += `
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="/semantic/dist/semantic.min.css">
        <script src="/semantic/dist/semantic.min.js"></script>
        <link rel="stylesheet" type="text/css" href="../src/styles/main.css">
        <div id="page-styles"></div>
    `;
    document.querySelector('body').innerHTML += '<div id="app" class="ui padded container"></div'

    // UserStore.shared.authed().then(authed => {
    //     if (authed) {
    //         Router.routeTo('/home')
    //     } else {
    //         Router.routeTo('/welcome');
    //     }
    // });
    UserStore.shared.currentUser().then(user => {
        console.log(user)
    })
    Router.routeTo('/home')
});