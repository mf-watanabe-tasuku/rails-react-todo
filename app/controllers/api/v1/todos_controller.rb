class Api::V1::TodosController < ApplicationController
  def index
    todos = Todo.includes(:tags).order(updated_at: :desc)
    render json: todos.to_json(:include => :tags)
  end

  def show
    todo = Todo.find(params[:id])
    render json: todo.to_json(:include => :tags)
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo
    else
      render json: todo.errors, status: 422
    end
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update(todo_params)
      render json: todo
    else
      render json: todo.errors, status: 422
    end
  end

  def destroy
    if Todo.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  def destroy_all
    if Todo.destroy_all
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :is_completed, :deadline, { tag_ids: [] })
  end
end