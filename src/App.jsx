import "./App.css";
import TodoList from "./features/TodoList/TodoList";
import TodoForm from "./features/TodoForm";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(todoTitle) {
    const todoItem = { id: Date.now(), title: todoTitle, isCompleted: false };

    setTodoList((previous) => [...previous, todoItem]);
  }

  function completeTodo(id) {
    const updatedTodo = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });

    setTodoList(updatedTodo);
  }

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
