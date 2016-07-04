class CreateRubrics < ActiveRecord::Migration
  def change
    create_table :rubrics do |t|
      t.string :title
      t.timestamps
    end
 
    create_table :posts_rubrics, id: false do |t|
      t.belongs_to :post, index: true
      t.belongs_to :rubric, index: true
    end
  end
end
