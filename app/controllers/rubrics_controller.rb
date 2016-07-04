class RubricsController < ApplicationController
  before_action :authenticate_user!, only: [:create]
  
  def index
    respond_with Rubric.includes(:posts).all
  end

  def create
    respond_with(Rubric.create(rubric_params), location: rubrics_url)
  end

  private
    def rubric_params
      params.require(:rubric).permit(:title)
    end
end
