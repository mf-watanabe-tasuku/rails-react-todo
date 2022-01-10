SAMPLE_TODOS = [
  {
    name: 'Going around the world',
    deadline: Date.tomorrow
  },
  {
    name: 'graduating from college'
  },
  {
    name: 'publishing a book'
  },
]

SAMPLE_TODOS.each do |todo|
  Todo.create(todo)
end

SAMPLE_TAGS = [
  {
    name: 'hobby'
  },
  {
    name: 'sports'
  },
  {
    name: 'travel'
  }
]

SAMPLE_TAGS.each do |tag|
  Tag.create(tag)
end