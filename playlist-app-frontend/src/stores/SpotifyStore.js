export default class SpotifyStore {
    BASE_URL = "http://localhost:3000";
    clientId = "API_KEY";
    redirectUri = "http://localhost:8080/";
    scopes = "user-read-currently-playing user-read-playback-state";

    static shared = new SpotifyStore();

    async searchFor(songName) {
        return await fetch(`https://api.spotify.com/v1/search?q=${songName.split(' ').join("%20")}&type=track&limit=10`, {
            headers: {
                "Authorization": `Bearer ${this.getHashParams().access_token}`
            }
        })
        .then(res => res.json())
        .then(json => json);
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }

      async getSongById(id) {
        return await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                "Authorization": `Bearer ${this.getHashParams().access_token}`
            }
        })
        .then(res => res.json())
        .then(json => json);
      }
}