import UserStore from "./UserStore";

export default class PlaylistStore {
    BASE_URL = "http://localhost:3000";
    static shared = new PlaylistStore();

    async createPlaylist(name) {
        return await UserStore.shared.currentUser().then( async user => {
            return await fetch(`${this.BASE_URL}/playlists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({playlist: {
                    user_id: user.id,
                    name: name
                }})
            }).then(res => res.json()).then(json => json);
        })
    }

    async getPlaylistsFor(user) {
        console.log(`User: ${user.id}`)
        return await fetch(`${this.BASE_URL}/users/${user.id}/playlists`).then(res => res.json()).then(json => json.playlists);    
    }

    async addSongTo(playlistId, song) {
        return await fetch(`${this.BASE_URL}/playlists/${playlistId}/add_song`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: song.name,
                artist_name: song.artists[0].name,
                spotify_id: song.id
            })
        }).then(res => res.json()).then(json => json);
    }

    async removeSongFrom(playlistId, song_id) {
        return await fetch(`${this.BASE_URL}/playlists/${playlistId}/remove_song`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                song_id: song_id
            })
        }).then(res => res.json()).then(json => json);
    }
}