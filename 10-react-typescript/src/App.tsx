import TodoList from './components/TodoList'
import NewTodo from './components/NewTodo'
import { useState } from 'react'
import { Todo } from './models/todo.model'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = (text: string) => {
    const newTodo = { id: Math.random().toString(), text }
    setTodos((todos) => [...todos, newTodo])
  }

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  return (
    <div className='App'>
      <NewTodo onAddTodo={handleAddTodo} />
      <TodoList onDeleteTodo={handleDeleteTodo} todos={todos} />
    </div>
  )
}

export default App
