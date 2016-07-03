class Post < ActiveRecord::Base
  has_many :comments, dependent: :destroy

  def as_json(options = {})
    super(options.merge(include: :comments))
  end
end
