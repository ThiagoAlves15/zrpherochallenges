namespace :api do
  namespace :v1 do
    scope :users, module: :users do
      post '/', to: 'registrations#create', as: :user_registration
      patch '/', to: 'registrations#update_profile', as: :user_update_profile
    end

    resources :heroes
    resources :threats
    resources :occurrences

    get '/users/me', to: 'users#me'
  end
end

scope :api do
  scope :v1 do
    use_doorkeeper do
      skip_controllers :authorizations, :applications, :authorized_applications
    end
  end
end