# encoding: utf-8
class Book < ActiveRecord::Base
  belongs_to :book
  has_many :books
  has_many :posts

  attr_accessible :name
end
