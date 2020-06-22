class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    create_table :songs do |t|
      t.integer :spotify_id
      t.integer :playlist_id
      t.string :name
      t.string :artist_name

      t.timestamps
    end
  end
end
