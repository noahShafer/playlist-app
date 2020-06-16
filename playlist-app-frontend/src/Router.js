import UserStore from "./stores/UserStore.js";
export default class Router {
    static routes = {
        '/welcome': null,
        '/login': null,
        'createaccount': null,
        'home': null
    };

    static nonAuthedRoutes() {
        return ['/login', '/createaccount', '/welcome']
    }

    static routeTo(route) {
        let routesArr = Object.keys(this.routes);
        if (routesArr.includes(route)) {
            if (!this.nonAuthedRoutes().includes(route)) {
                console.log("This is non authed route");
            } else {
                UserStore.shared.currentUser().then(user => {
                    if (user) {
                        console.log(`user is authed: ${route}`);
                    } else {
                        console.log(`user is not authed`);
                    }
                })
            }
        } else {
            console.log("that route does not exist")
        }
    }
}