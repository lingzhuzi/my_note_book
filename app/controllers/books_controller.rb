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
    @book = Book.find(params[:id])
    @books = @book.books
    @posts = @book.posts
    respond_to do |format|
      format.html { render :index }
      format.json { render json: {book: @book, books: @books, posts: @posts }}
    end
  end

  def create
    @book = Book.new(book_params)

    respond_to do |format|
      if @book.save
        parent_book = @book.book
        path = parent_book.present? ? book_path(parent_book) : books_path
        format.html { redirect_to path }
        format.json { render :json => @book }
      else
        format.html { render :action => :new, :notice => "保存失败" }
        format.json { render :json => "error" }
      end
    end
  end



  def update
    @book = Book.find(params[:id])

    respond_to do |format|
      if @book.update_attributes(book_params)
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
    @books = Book.where('name like ?', "%#{params[:key_word]}%")
    @posts = Post.where('title like ?', "%#{params[:key_word]}%")

    respond_to do |format|
      format.json { render :json => {:res => render_to_string(:partial => "res", :formats => [:html])} }
    end
  end

  def back
    book = Book.find(params[:book_id])

    if book && book.book.present?
      redirect_to book_path(book.book)
    else
      redirect_to books_path
    end
  end

  private
  def book_params
    params.require(:book).permit(:name, :book_id)
  end
end
