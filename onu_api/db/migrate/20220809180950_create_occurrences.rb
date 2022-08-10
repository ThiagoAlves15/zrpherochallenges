class CreateOccurrences < ActiveRecord::Migration[7.0]
  def change
    create_table :occurrences do |t|
      t.boolean :resolved, default: false

      t.references :hero, foreign_key: true
      t.references :threat, null: false, foreign_key: true

      t.timestamps
    end
  end
end
