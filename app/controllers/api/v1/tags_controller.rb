class Api::V1::TagsController < ApplicationController
  def index
    tags = Tag.order(updated_at: :desc)
    render json: tags
  end

  def show
    tag = Tag.find(params[:id])
    render json: tag
  end

  def create
    tag = Tag.new(tag_params)
    if tag.save
      render json: tag
    else
      render json: tag.errors, status: 422
    end
  end

  def update
    tag = Tag.find(params[:id])
    if tag.update(tag_params)
      render json: tag
    else
      render json: tag.errors, status: 422
    end
  end

  def destroy
    if Tag.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
