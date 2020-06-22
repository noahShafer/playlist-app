import UserStore from "./stores/UserStore.js";
import WelcomeController from "./controllers/WelcomeController.js";
import LoginController from "./controllers/LoginController.js";
import CreateAccountController from "./controllers/CreateAccountController.js";
import HomeController from "./controllers/HomeController.js";
import CreatePlaylistController from "./controllers/CreatePlaylistController.js";



export default class Router {
    static routes = {
        '/welcome': new WelcomeController(),
        '/login': new LoginController(),
        '/createaccount': new CreateAccountController(),
        '/home': new HomeController(),
        '/createplaylist': new CreatePlaylistController()
    };

    static nonAuthedRoutes() {
        return ['/login', '/createaccount', '/welcome'];
    }

    static routeTo(route) {
        let routesArr = Object.keys(this.routes);
        if (routesArr.includes(route)) {
            if (this.nonAuthedRoutes().includes(route)) {
                console.log("This is non authed route");
                this.clearView();
                console.log(`Route to ${route}`)
                this.routes[route].layout();
            } else {
                UserStore.shared.currentUser().then(user => {
                    if (user) {
                        console.log(`user is authed: ${route}`);
                        console.log(`Route to ${route}`)
                        this.routes[route].layout();
                    } else {
                        console.log(`user is not authed`);
                        console.log(`Route to ${route}`)
                        this.routes[route].layout();
                    }
                })
            }
        } else {
            console.log("that route does not exist");
        }
    }

    static clearView() {
        document.querySelector('#app').innerHTML = "";
    }
}