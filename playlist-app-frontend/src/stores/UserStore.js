export default class UserStore {
    BASE_URL = "http://localhost:3000";
    clientId = "API_KEY";
    redirectUri = "http://localhost:8080/";
    scopes = "user-read-currently-playing user-read-playback-state";

    static shared = new UserStore();

    async authed() {
        return await this.currentUser().then(user => {
            if (user) {
                return true
            }
            return false
        });
    }

    async currentUser() {
        // return await fetch(`${this.BASE_URL}/logged_in`)
        // .then(res => res.json())
        // .then(json => {
        //     console.log(json)
        //     if (json.logged_in) {
        //         return json.user;
        //     } else {
        //         return null;
        //     }
        // });
        return await fetch(`${this.BASE_URL}/users/1`)
        .then(res => res.json())
        .then(json => json.user);
    }

    async login(username, password) {
        return await fetch(`${this.BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user: {
                    username: username,
                    password: password
            }})
        }).then(res => res.json()).then(json => json);    
    }

    async createUser(username, password) {
        return await fetch(`${this.BASE_URL}/users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user: {
                    username: username,
                    password: password
            }})
        }).then(res => res.json()).then(json => json);    
    }

    async getUser(id) {
        return await fetch(`${this.BASE_URL}/users/${id}`)
        .then(res => res.json())
        .then(json => json);
    }
}