# encoding: utf-8
class BooksController < ApplicationController
  def index
    @books = Book.where("book_id is null")
    @posts = Post.where("book_id is null")

    respond_to do |format|
      format.html
      format.json { render :json => @books }
    end
  end

  def show

  end

  def new
    @book = Book.new

    respond_to do |format|
      format.html
      format.json { render :json => @book }
    end
  end

  def create
    @book = Book.new(params[:book])

    respond_to do |format|
      if @book.save
        format.html { redirect_to books_path }
      else
        format.html { render :action => :new , :notice => "保存失败"}
      end
    end
  end

  def edit

  end

  def update

  end

  def destroy

  end

  def search
    @books = Book.where(:book_id => params[:id])
    @posts = Post.where(:book_id => params[:id])

    respond_to do |format|
      format.json { render :json => {:html => render_to_string(:partial => "res", :formats => [:html])}}
    end
  end
end
