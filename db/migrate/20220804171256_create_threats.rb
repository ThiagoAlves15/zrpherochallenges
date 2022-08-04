class CreateThreats < ActiveRecord::Migration[7.0]
  def change
    create_table :threats do |t|
      t.string :name
      t.string :tier
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
