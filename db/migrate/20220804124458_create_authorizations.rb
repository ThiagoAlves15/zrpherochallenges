class CreateAuthorizations < ActiveRecord::Migration[7.0]
  def change
    create_table :authorizations do |t|
      t.string :provider
      t.string :uid
      t.integer :admin_id

      t.timestamps
    end
  end
end
