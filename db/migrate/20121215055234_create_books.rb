class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :name
      t.references :book

      t.timestamps
    end
    add_index :books, :book_id
  end
end
