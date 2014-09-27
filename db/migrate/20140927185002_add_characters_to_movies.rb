class AddCharactersToMovies < ActiveRecord::Migration
  def change
    add_column :movies, :character_one, :string
    add_column :movies, :character_two, :string
  end
end
