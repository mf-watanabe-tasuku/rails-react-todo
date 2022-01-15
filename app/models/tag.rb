class Tag < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :todo_tags
  has_many :todos, through: :todo_tags
end
