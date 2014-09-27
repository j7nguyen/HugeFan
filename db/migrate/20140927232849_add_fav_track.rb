class AddFavTrack < ActiveRecord::Migration
  def change
    add_column :artists, :favorite_track, :string
  end
end
