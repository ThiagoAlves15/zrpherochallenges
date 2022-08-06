module Api
  module V1
    module Users
      class UsersController < ApiController
        before_action :doorkeeper_authorize!
        before_action :current_user

        def me
          if @current_user.nil?
            render json: { error: 'Not authorized' }, status: :unauthorized
          else
            render json: {
              id: @current_user.id,
              email: @current_user.email,
              role: @current_user.role,
              created_at: @current_user.created_at,
            }, status: :ok
          end
        end
      end
    end
  end
end
