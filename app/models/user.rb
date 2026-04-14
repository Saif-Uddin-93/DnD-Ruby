class User < ApplicationRecord
  # Tell Rails to use your custom primary key
  self.primary_key = 'user_id'

  # Map has_secure_password to use password_hash instead of password_digest
  has_secure_password :password, validations: true
  
  # This tells BCrypt to look at password_hash
  def password_digest
    self.password_hash
  end

  def password_digest=(value)
    self.password_hash = value
  end

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end