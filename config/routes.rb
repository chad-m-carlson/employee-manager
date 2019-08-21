Rails.application.routes.draw do

  namespace :api do
    resources :employees
  end
  
  get '*other', to: 'static#index'
end
