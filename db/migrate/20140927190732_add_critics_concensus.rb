class AddCriticsConcensus < ActiveRecord::Migration
  def change
    add_column :movies, :critics_concensus, :string
  end
end
