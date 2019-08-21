Rails.application.routes.draw do

  namespace :api do
    resources :employees
  end
  
end
