class ApiController < ApplicationController
  before_action :doorkeeper_authorize!
  respond_to :json

  def current_user
    return unless doorkeeper_token

    @current_user ||= User.find_by(id: doorkeeper_token[:resource_owner_id])
  end
end
