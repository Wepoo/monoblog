class Post < ActiveRecord::Base

  has_many :comments, dependent: :destroy
  has_and_belongs_to_many :rubrics
  belongs_to :user

  def as_json(options = {})
    super(options.merge(include: [:user, :rubrics, comments: {include: :user}]))
  end
end
