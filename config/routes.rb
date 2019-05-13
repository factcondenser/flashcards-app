Rails.application.routes.draw do
  devise_for :users
  root 'flashcards#index'
  resources :flashcards

  # Service Worker Routes
  get '/service-worker.js' => 'service_worker#service_worker'
  get '/manifest.json' => 'service_worker#manifest'
  post '/push' => 'service_worker#push'
end
