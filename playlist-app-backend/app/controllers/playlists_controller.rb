class PlaylistsController < ApplicationController
    def create 
        playlist = Playlist.create(playlist_params)
        render json: {
            playlist: playlist
        }
    end

    def add_song
        playlist = Playlist.find_by(id: params[:id])
        song = Song.find_or_create_by(spotify_id: params[:spotify_id])
        song.name = params[:name]
        song.artist_name = params[:artist_name]
        playlist.songs << song
        render json: {
            playlist: playlist
        }
    end

    def remove_song
        playlist = Playlist.find_by(id: params[:id])
        song = Song.find_by(id: params[:song_id])
        playlist.songs = playlist.songs.filter {|e| e.id != song.id}
        playlist.save
        render json: {
            playlist: playlist,
            songs: playlist.songs
        }
    end

    def playlist_params
        params.require(:playlist).permit(:user_id, :name)
    end 
end
