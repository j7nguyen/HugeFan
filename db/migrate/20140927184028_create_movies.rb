class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title
      t.string :year
      t.string :score
      t.string :actor_one
      t.string :actor_two
      t.timestamps
    end
  end
end
