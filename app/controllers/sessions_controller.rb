class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    user_info = request.env['omniauth.auth']

    render :text => user_info.inspect # Your own session management should be placed here.
  end

  def failure
  end
end