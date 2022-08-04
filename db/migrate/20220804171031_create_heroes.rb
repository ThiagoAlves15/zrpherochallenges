class CreateHeroes < ActiveRecord::Migration[7.0]
  def change
    create_table :heroes do |t|
      t.string :name
      t.string :rank
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
