class Rubric < ActiveRecord::Base
  has_and_belongs_to_many :posts

  def as_json(options = {})
    super(options.merge(include: :posts))
  end
end
