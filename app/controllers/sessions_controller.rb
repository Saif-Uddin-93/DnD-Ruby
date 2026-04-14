# app/controllers/sessions_controller.rb
class SessionsController < ApplicationController
  def create
    # Find by username or email based on your login form preference
    user = User.find_by(email: params[:login_identity]) || User.find_by(username: params[:login_identity])

    if user&.authenticate(params[:password]) && user.is_active
      session[:user_id] = user.user_id # Using user_id here
      user.update(last_login: Time.current)
      
      render json: { status: 'success', message: 'Welcome back!' }, status: :ok
    else
      render json: { status: 'error', message: 'Invalid credentials or inactive account' }, status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to login_path
  end

end