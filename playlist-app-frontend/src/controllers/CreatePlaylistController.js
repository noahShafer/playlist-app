import View from "../components/View.js";
import PlaylistStore from "../stores/PlaylistStore.js";
import Router from "../Router.js";

export default class CreatePlaylistController extends View {
    layout() {
        super.layout();
        this.createForm();
    }

    setupNav() {
        super.setupNav();
    }

    createForm() {
        let view = document.querySelector('#app');
        view.innerHTML += `
            <div class="ui container">
                <h1 class="ui header inverted">Create a Playlist</h1>
                <form id="create-playlist-form" class="ui form inverted">
                    <div class="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name">
                    </div>
                    <button class="ui button green" type="submit">Create</button>
                </form>
            </div>
        `;
        document.querySelector('#create-playlist-form').addEventListener('submit', e => {
            e.preventDefault();
            PlaylistStore.shared.createPlaylist(e.target.name.value).then(res => Router.routeTo('/home'))
        });
    }
}