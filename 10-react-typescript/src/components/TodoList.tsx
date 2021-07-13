import React from 'react'
import { Todo } from '../models/todo.model'
import './TodoList.css'

interface TodoListProps {
  todos: Todo[]
  onDeleteTodo: (id: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo }) => {
  const handleDeleteTodo = (id: string) => {
    onDeleteTodo(id)
  }

  const todoComponents = todos.map((el) => (
    <li key={el.id}>
      <span>{el.text}</span>
      <button onClick={() => handleDeleteTodo(el.id)}>Delete</button>
    </li>
  ))

  return <ul>{todoComponents}</ul>
}

export default TodoList
