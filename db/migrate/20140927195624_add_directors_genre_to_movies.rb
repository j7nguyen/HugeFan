class AddDirectorsGenreToMovies < ActiveRecord::Migration
  def change
    add_column :movies, :director, :string
    add_column :movies, :genre, :string
  end
end
