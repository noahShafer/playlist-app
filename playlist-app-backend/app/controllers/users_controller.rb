class UsersController < ApplicationController
    def create
        @user = User.create(user_params)
        render json: {
            user: @user
        }
    end

    def show 
        @user = User.find_by(id: params[:id])
        render json: {
            user: @user
        }
    end

    def playlists
        p params
        @user = User.find_by(id: params[:id])
        playlists = @user.playlists.map {|p| {:playlist => p, :songs => p.songs, :created_at => p.created_at.to_time.to_i}}
        render json: {
            playlists: playlists
        }
    end

    def user_params
        params.require(:user).permit(:username,:password)
    end
end
