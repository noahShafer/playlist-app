export default class UserStore {
    BASE_URL = "http://localhost:3000";
    static shared = new UserStore();

    async currentUser() {
        return await fetch(`${this.BASE_URL}/logged_in`)
        .then(res => res.json())
        .then(json => {
            if (json.logged_in) {
                return json.user;
            } else {
                return null;
            }
        });
    }
}