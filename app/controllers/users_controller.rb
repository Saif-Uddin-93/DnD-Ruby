# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def create
    # Take the part before the @ in the email as a temporary username
    temp_username = params[:email].split('@').first
    # We use the password_hash logic defined in your User model
    @user = User.new(
      email: params[:email],
      password: params[:password],
      username: temp_username, # Default username from email
      is_active: true
    )

    if @user.save
      # Log them in immediately by setting the session
      session[:user_id] = @user.user_id
      render json: { status: 'success', message: 'Welcome to the Tavern!' }, status: :created
    else
      render json: { status: 'error', message: @user.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end
end