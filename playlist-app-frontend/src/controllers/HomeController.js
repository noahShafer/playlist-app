import View from "../components/View.js";
import PlaylistStore from "../stores/PlaylistStore.js";
import UserStore from "../stores/UserStore.js";
import Router from "../Router.js";
import SpotifyStore from "../stores/SpotifyStore.js";


export default class HomeController extends View {

    layout() {
        super.layout();
        this.createPlaylistBtn();
        this.createPlaylistsList().then(() => {

            let playlistBtn = document.getElementById('create-playlist-btn');
            console.log(playlistBtn);
            playlistBtn.addEventListener('click', e => Router.routeTo('/createplaylist'));

            let searchSongForm = document.getElementById('search-song-from');
            searchSongForm.addEventListener('submit', e => {
                e.preventDefault()
                SpotifyStore.shared.searchFor(e.target.search.value).then(res => this.layoutSongSearchResults(res))
            })

            let url = 'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + UserStore.shared.clientId +
            (UserStore.shared.scopes ? '&scope=' + encodeURIComponent(UserStore.shared.scopes) : '') +
            '&redirect_uri=' + encodeURIComponent(UserStore.shared.redirectUri);

            this.spotifyLogin()
        });
    }

    setupNav() {
        super.setupNav();
        let nav = document.querySelector('#navbar');
        nav.querySelector('#right-menu').innerHTML += `
            ${SpotifyStore.shared.getHashParams().access_token ? '' : '<a id="connect-spotify" class="ui basic button green">Connect Spotify</a>'}
        `;

        nav.querySelector('#left-menu').innerHTML += `
        <form id="search-song-from">
            ${SpotifyStore.shared.getHashParams().access_token ? `<div class="ui input">
            <input id="search-song-field" type="text" name="search" placeholder="search...">
        </div>
        <button type="submit" class="ui button basic green">search</button>
        </form>` : ''}
            
        `
        if (!SpotifyStore.shared.getHashParams().access_token) {
            let connectSpotifyBtn = document.querySelector('#connect-spotify');

            // Add event listeners
            connectSpotifyBtn.addEventListener('click', e => {});
        }
       
    }

    createPlaylistBtn() {
        let view = document.querySelector('#app');
        view.innerHTML += '<div class="margin-top margin-bottom"><a id="create-playlist-btn" class="ui green button">create playlist</a></div';
    }

    async createPlaylistsList() {
        console.log("creating playlist list")
        await UserStore.shared.currentUser().then(async user => {
            console.log(`Got user: ${user.username}`);
            await PlaylistStore.shared.getPlaylistsFor(user).then((playlists) => {
                let view = document.querySelector('#app');
                view.innerHTML += '<div id="playlist-list"></div>';
                console.log(playlists)
                playlists.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1).forEach(p => view.querySelector('#playlist-list').innerHTML += `<div id="${p.playlist.id}" class="ui container segment inverted playlist-item">${p.playlist.name} - ${p.songs.length} songs</div>`);
                document.querySelectorAll(`.playlist-item`).forEach(el => {
                    el.addEventListener('click', e => this.layoutPlaylistPage(playlists.find(p => p.playlist.id == e.target.id)))
                })
                return true
            });
        })
    }

    layoutPlaylistPage(playlist) {
        console.log(playlist)
        let view = document.querySelector('#app');
        view.innerHTML = "";
        view.innerHTML += '<div id="playlists-songs" class="ui container margin-top margin-bottom"></div>';
        view.querySelector('#playlists-songs').innerHTML += `<div class="ui container margin-top"><h2 class="ui header inverted">${playlist.playlist.name}</h2></div>`;
        playlist.songs.forEach(song => {
            view.querySelector('#playlists-songs').innerHTML += `
                <div class="ui cards">
                    <div class="ui centered card inverted">
                        <div class="content">
                        <div class="header">${song.name}</div>
                        <div class="description">
                            ${song.artist_name}
                        </div>
                        </div>
                        <div id=${song.id} class="ui bottom attached red button remove-song-btn">
                        <i class="remove icon"></i>
                        Remove Song
                        </div>
                    </div>
                </div>
            `;
        });
        console.log(document.querySelectorAll('.remove-song-btn'))
        document.querySelectorAll('.remove-song-btn').forEach(el => {
            el.addEventListener('click', e => {
                PlaylistStore.shared.removeSongFrom(playlist.playlist.id, e.target.id).then(res => {
                    console.log(res);
                    this.layoutPlaylistPage(res)
                })
            })
        })
    }

    layoutSongSearchResults(object) {
        console.log(object)
        let view = document.querySelector('#app');
        view.innerHTML = "";
        view.innerHTML += '<div id="songs-search-list" class="ui container margin-top margin-bottom"></div>';
        object.tracks.items.forEach(song => {
            view.querySelector('#songs-search-list').innerHTML += `
                <div class="ui cards">
                    <div class="ui centered card inverted">
                        <div class="content">
                        <div class="header">${song.name}</div>
                        <div class="description">
                            ${song.artists[0].name}
                        </div>
                        </div>
                        <div id=${song.id} class="ui bottom attached green button add-song-btn">
                        <i class="add icon"></i>
                        Add Song
                        </div>
                    </div>
                </div>
            `;
        });
        console.log(document.querySelectorAll('.add-song-btn'))
        document.querySelectorAll('.add-song-btn').forEach(el => {
            el.addEventListener('click', e => {
                this.layoutAddToPlaylistForSong(e.target.id)
            })
        })
    }

    layoutAddToPlaylistForSong(songId) {
        SpotifyStore.shared.getSongById(songId).then(song => {
            UserStore.shared.currentUser().then(user => {
                PlaylistStore.shared.getPlaylistsFor(user).then(playlists => {
                    let view = document.querySelector('#app');
                    view.innerHTML = "";
                    view.innerHTML += "<h2 class='ui header inverted'>Select a Playlist</h2>";
                    view.innerHTML += '<div id="select-playlist-list" class="ui container"></div>';
                    playlists.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1).forEach(p => {
                        view.querySelector('#select-playlist-list').innerHTML += `<div id="${p.playlist.id}" class="ui container segment inverted select-playlist">${p.playlist.name}</div>`
                    });
                    document.querySelectorAll(".select-playlist").forEach(el => {
                        el.addEventListener('click', e => {
                            PlaylistStore.shared.addSongTo(e.target.id, song).then(res => {
                                this.layout();
                            })
                        })
                    })
                })
            })
        });
    }

    spotifyLogin() {

        var stateKey = 'spotify_auth_state';

        /**
         * Obtains parameters from the hash of the URL
         * @return Object
         */
        function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }

        /**
         * Generates a random string containing numbers and letters
         * @param  {number} length The length of the string
         * @return {string} The generated string
         */
        function generateRandomString(length) {
          var text = '';
          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

          for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        };

        // var userProfileSource = document.getElementById('user-profile-template').innerHTML,
        //     userProfileTemplate = Handlebars.compile(userProfileSource),
        //     userProfilePlaceholder = document.getElementById('user-profile');

        //     oauthSource = document.getElementById('oauth-template').innerHTML,
        //     oauthTemplate = Handlebars.compile(oauthSource),
        //     oauthPlaceholder = document.getElementById('oauth');

        var params = getHashParams();

        var access_token = params.access_token,
            state = params.state,
            storedState = localStorage.getItem(stateKey);
        console.log(access_token && (state == null || state !== storedState))
        if (false) { //(access_token && (state == null || state !== storedState)) {
          alert('There was an error during the authentication');
        } else {
          localStorage.removeItem(stateKey);
          if (access_token) {
            // $.ajax({
            //     url: 'https://api.spotify.com/v1/me',
            //     headers: {
            //       'Authorization': 'Bearer ' + access_token
            //     },
            //     success: function(response) {
            //     //   userProfilePlaceholder.innerHTML = userProfileTemplate(response);

            //     //   $('#login').hide();
            //     //   $('#loggedin').show();
            //     }
            // });
            fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }).then(res => res.json()).then(json => console.log(json))
          } else {
            //   $('#login').show();
            //   $('#loggedin').hide();
          }

          if (!SpotifyStore.shared.getHashParams().access_token) {
            document.getElementById('connect-spotify').addEventListener('click', function() {

                var state = generateRandomString(16);
    
                localStorage.setItem(stateKey, state);
                var scope = 'user-read-private user-read-email';
    
                var url = 'https://accounts.spotify.com/authorize';
                url += '?response_type=token';
                url += '&client_id=' + encodeURIComponent(UserStore.shared.clientId);
                url += '&scope=' + encodeURIComponent(UserStore.shared.scopes);
                url += '&redirect_uri=' + encodeURIComponent(UserStore.shared.redirectUri);
                url += '&state=' + encodeURIComponent(state);
    
                window.location = url;
              }, false);
          }
        }
      }
}