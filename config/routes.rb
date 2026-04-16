Rails.application.routes.draw do
  # Defines the root path route ("/")
  # root "posts#index"
  root "pages#home"

  get "home", to: "pages#home"
  get "about", to: "pages#about"
  get "profile", to: "pages#profile"
  get "character_creation", to: "pages#character_creation"
  get "login", to: "pages#login"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  get "sign_up", to: "pages#sign_up"
  post 'sign_up_process', to: 'users#create'
  get "dashboard", to: "pages#dashboard"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html


  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

end
