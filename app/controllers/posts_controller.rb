class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  
  def index
    respond_with Post.includes(:user, :comments, :rubrics).all
  end

  def create
    respond_with Post.create(post_params.merge(user_id: current_user.id))
  end

  def show
    respond_with Post.includes(:user, :comments, :rubrics).find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    @post.update(post_params)
    
    render :text => '{ Post was successfully updated. }', :status => :ok
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    
    render :text => '{ Post was successfully deleted. }', :status => :ok
  end

  private
    def post_params
      params.require(:post).permit(:title, :body)
    end

end
