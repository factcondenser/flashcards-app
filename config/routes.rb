Rails.application.routes.draw do
  root 'flashcards#index'
  resources :flashcards
end
