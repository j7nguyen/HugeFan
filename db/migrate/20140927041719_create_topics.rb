class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :title, null: false
      t.string :summary 
      t.timestamps
    end
  end
end
