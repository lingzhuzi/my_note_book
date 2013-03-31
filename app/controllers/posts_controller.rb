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
    @post = Post.new(:title => "在此输入标题")

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
    @post = Post.new(params[:post])
    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, :notice => 'post has created successfully' }
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
      if @post.update_attributes(params[:post])
        format.html { redirect_to post_path(@post), :notice => 'post was successfully updated.' }
        format.json { render :json => {:id => @post.id, :status => :updated} }
      else
        format.html { render :action => "edit" }
        format.json { render :json => {:error => @post.errors, :status => :unprocessable_entity} }
      end
    end
  end

  def destroy

  end
end
