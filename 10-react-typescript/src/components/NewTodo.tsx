import React from 'react'
import { useRef } from 'react'
import './NewTodo.css'

interface NewTodoProps {
  onAddTodo: (todoText: string) => void
}
const NewTodo: React.FC<NewTodoProps> = ({ onAddTodo }) => {
  const textInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Use ! to force TS acceptance since we know that the
    // element must exist before form submission
    const enteredText = textInputRef.current!.value
    onAddTodo(enteredText)
    textInputRef.current!.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='todo-text'>Todo Text</label>
        <input type='text' id='todo-text' ref={textInputRef} />
      </div>
      <button type='submit'>ADD TODO</button>
    </form>
  )
}

export default NewTodo
