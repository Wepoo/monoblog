class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def create
    post = Post.find(params[:post_id])
    comment = post.comments.create(comment_params.merge(user_id: current_user.id))
    respond_with(post, comment, location: post_comments_url)
  end

  private
    def comment_params
      params.require(:comment).permit(:body)
    end

end
