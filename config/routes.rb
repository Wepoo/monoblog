Rails.application.routes.draw do
 
  root to: 'application#angular'

  resources :posts, only: [:create, :show, :index, :update, :destroy] do
    resources :comments, only: [:create]

    member do
      put '/upvote' => 'posts#upvote'
    end
  end

end
