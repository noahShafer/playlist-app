import Router from "../Router";

export default class View {

    layout() {
        document.querySelector("#app").innerHTML = "";
        this.setupNav();
    }

    setupNav() {
        let nav = document.querySelector('#navbar');
        let appName = document.querySelector("#app-name");
        nav.querySelector('#right-menu').innerHTML = "";
        nav.querySelector('#left-menu').innerHTML = "";

        appName.addEventListener('click', e => location.reload());
    }
}