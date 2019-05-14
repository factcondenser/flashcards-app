class AddCurrentJidToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :current_jid, :integer
  end
end
