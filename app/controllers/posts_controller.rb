# encoding: utf-8
class PostsController < ApplicationController
  def index

  end

  def show
    @post = Post.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render :json => @post }
    end
  end

  def new
    @post = Post.new(:title => "在此输入标题", :book_id => params[:book_id])

    respond_to do |format|
      format.html
    end
  end

  def edit
    @post = Post.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render :json => @post }
    end
  end

  def create
    @post = Post.new(post_params)
    respond_to do |format|
      if @post.save
        format.html { redirect_to edit_post_path(@post), :notice => 'post has created successfully' }
        format.json { render :json => {:id => @post.id, :status => :created} }
      else
        format.html { render :action => "new" }
        format.json { render :json => {:errors => @post.errors, :status => :unprocessable_entity} }
      end
    end
  end

  def update
    @post = Post.find(params[:id])

    respond_to do |format|
      if @post.update_attributes(post_params)
        format.html { redirect_to post_path(@post), :notice => 'post was successfully updated.' }
        format.json { render :json => {status: 'updated'} }
      else
        format.html { render :action => "edit" }
        format.json { render :json => {:error => @post.errors, :status => :unprocessable_entity} }
      end
    end
  end

  def destroy

  end

  private
  def post_params
    params.require(:post).permit(:title, :content, :book_id)
  end
end
