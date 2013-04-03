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
        format.json { render :json => @book }
      else
        format.html { render :action => :new, :notice => "保存失败" }
        format.json { render :json => "error" }
      end
    end
  end

  def edit

  end

  def update
    @book = Book.find(params[:id])

    respond_to do |format|
      if @book.update_attributes(params[:book])
        format.html { redirect_to book_path(@book), :notice => 'book was successfully updated.' }
        format.json { render :json => {:id => @book.id, :status => :updated} }
      else
        format.html { render :action => "edit" }
        format.json { render :json => {:error => @book.errors, :status => :unprocessable_entity} }
      end
    end
  end

  def destroy
    @book = Book.find(params[:id])
    @book.destroy

    respond_to do |format|
      format.html { redirect_to books_path, :notice => 'book was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  def search
    @books = Book.where(:book_id => params[:id])
    @posts = Post.where(:book_id => params[:id])

    respond_to do |format|
      format.json { render :json => {:html => render_to_string(:partial => "res", :formats => [:html])} }
    end
  end
end
