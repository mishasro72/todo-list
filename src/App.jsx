import "./App.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(todoTitle) {
    const todoItem = { id: Date.now(), title: todoTitle };

    setTodoList((previos) => [...previos, todoItem]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
