# encoding: utf-8
class Post < ActiveRecord::Base
  belongs_to :book
  attr_accessible :author, :content, :from, :title
end
