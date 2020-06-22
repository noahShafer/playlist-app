Rails.application.routes.draw do
  resources :songs
  resources :playlists, only: [:show, :create]
  resources :users, only: [:show, :index, :create]
  
  post '/playlists/:id/add_song', to: 'playlists#add_song'
  patch '/playlists/:id/remove_song', to: 'playlists#remove_song'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  get '/users/:id/playlists', to: 'users#playlists'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
