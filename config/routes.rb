Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'primes/index'
      get 'primes/all'
      post 'primes/create'
    end
  end
  root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

