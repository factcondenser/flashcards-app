class ChangeCurrentJidTypeInUsers < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :current_jid, :text
  end
end
