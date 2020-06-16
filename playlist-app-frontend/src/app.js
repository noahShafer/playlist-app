import navbar from "./components/Navbar.js";
import Router from "./Router.js";


const BASE_URL = "http://localhost:3000";

window.addEventListener('load', e => {
    document.querySelector('html').innerHTML = navbar;
    document.querySelector('head').innerHTML += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">'

    document.querySelector('#login-btn').addEventListener('click', e => {
        Router.routeTo('/login');
    });
});