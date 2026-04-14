class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: false do |t|
      t.serial :user_id, primary_key: true
      t.string :username, limit: 50, null: false
      t.string :email, limit: 255, null: false
      t.text :password_hash, null: false
      t.timestamptz :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamptz :last_login
      t.boolean :is_active, default: true

      t.index :username, unique: true
      t.index :email, unique: true
      t.index :last_login, name: 'idx_users_last_login'
    end

    # Adding the email format constraint manually
    execute <<-SQL
      ALTER TABLE users 
      ADD CONSTRAINT check_email_format 
      CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$');
    SQL
  end
end