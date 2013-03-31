class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.string :from
      t.string :author
      t.string :chapters
      t.references :book

      t.timestamps
    end
    add_index :posts, :book_id
  end
end
